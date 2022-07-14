import * as UI from '@dcl/ui-scene-utils'
import * as boothUI from './ui'
import * as utils from '@dcl/ecs-scene-utils'

import { UserData } from '@decentraland/Identity'
import { getCurrentRealm, Realm } from '@decentraland/EnvironmentAPI'
import { PlayCloseSound } from './sounds'
import { signedFetch } from '@decentraland/SignedFetch'
import resources, {
  Attendee,
  ClickerBox,
  Parent,
  setAttendeeData
} from '../resources'

const timeDelay = 5 * 60 * 1000 // Delay before being able to claim a POAP in milliseconds

/**
 *
 * @param {TranformConstructorArgs} transform position, rotation and scale of the booth
 * @param {string} poapServer server to use
 * @param {string} eventUUID ID of the event
 *
 */
export function createDispenser(
  transform: TranformConstructorArgs,
  eventUUID: string,
  poapServer?: string
) {
  const createdTime = new Date()
  const serverURL: string = poapServer
    ? poapServer
    : 'poap-api.decentraland.org'

  let alreadyAttempted: boolean = false
  const poap = new Entity()
  poap.addComponent(ClickerBox)
  poap.addComponent(new Transform(transform))
  const pointerAction: OnPointerDown = new OnPointerDown(
    (_e) => {
      void makeTransaction()
    },
    { hoverText: 'Get Attendance Token' }
  )
  poap.addComponent(
    new utils.TriggerComponent(resources.floorTriggers.djRoom, {
      onCameraEnter: () => {
        poap.addComponent(pointerAction)
      },
      onCameraExit: () => {
        poap.removeComponent(OnPointerDown)
      }
    })
  )
  engine.addEntity(poap)
  poap.setParent(Parent)

  async function getCaptcha(): Promise<string> {
    const captchaUUIDQuery = await signedFetch(`https://${serverURL}/captcha`, {
      method: 'POST'
    })
    const json = JSON.parse(captchaUUIDQuery.text)
    return json.data.uuid
  }

  async function makeTransaction() {
    if (!Attendee.data) {
      await setAttendeeData()
    }
    // no wallet
    if (!Attendee.data || !Attendee.data.hasConnectedWeb3) {
      log('no wallet')
      PlayCloseSound()

      boothUI.metamask()
      return
    }

    // 5 minutes timer before claiming
    if (+createdTime > +new Date() - timeDelay) {
      PlayCloseSound()
      boothUI.timerBeforeClaim(createdTime, timeDelay)
      return
    }

    // already attempted
    if (alreadyAttempted) {
      PlayCloseSound()
      boothUI.alreadyClaimed()
      return
    }

    alreadyAttempted = true
    const realm = await getCurrentRealm()

    try {
      const captchaUUID = await getCaptcha()
      const captchaResult = await boothUI.captcha(serverURL, captchaUUID)
      if (captchaResult === undefined) {
        alreadyAttempted = false
        return
      }
      const response = await claimCall(captchaResult, Attendee.data, realm)
      log(response)
      log(response.status)
      const json = await response.json()
      log(json)
      if (response.status === 200) {
        boothUI.viewSuccessMessage(
          json.data.event.name,
          json.data.event.image_url,
          1024,
          1024
        )

        resources.sceneMessageBus.emit('activatePoap', {})
      } else {
        PlayCloseSound()
        switch (json.error) {
          case 'Address already claimed a code for this event':
            UI.displayAnnouncement(`You already claimed this event`, 3)

            break

          default:
            alreadyAttempted = false
            UI.displayAnnouncement(
              `Oops, there was an error: "${json.error}"`,
              3
            )
            break
        }
      }
    } catch {
      alreadyAttempted = false
      log('Error fetching from POAP server ', serverURL)
    }

    return
  }

  async function claimCall(
    captchaResult: string,
    userData: UserData,
    realm: Realm
  ) {
    return await fetch(`https://${serverURL}/claim/${eventUUID}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({
        address: userData.publicKey,
        catalyst: realm.domain,
        room: realm.room,
        captcha: captchaResult
      })
    })
  }
}
