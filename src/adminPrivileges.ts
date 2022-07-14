import * as ui from '@dcl/ui-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import resources, { Attendee, setAttendeeData } from './resources'
import { DobUI } from './dob/ui'

const administrators = [
  resources.administrators.jade,
  resources.administrators.yoolee,
  resources.administrators.fabian,
  resources.administrators.philipp,
  resources.administrators.phoebe,
  resources.administrators.bryony,
  resources.administrators.colleen,
  resources.administrators.calum,
  resources.administrators.natasha
]

let announceUI: ui.CustomPrompt
let kickPlayerUI: ui.CustomPrompt
let inputText: string

export async function InitAdminPrivileges() {
  if (!Attendee.data.userId) {
    await setAttendeeData()
  }

  for (const id of administrators) {
    if (Attendee.data && id === Attendee.data.publicKey) {
      Attendee.isAdmin = true
      break
    }
  }

  if (Attendee.isAdmin) {
    //========= Announce UI ========//
    announceUI = new ui.CustomPrompt('dark', 500, 250)
    announceUI.addText('Announcement', 0, 95, Color4.White(), 24)
    announceUI.addTextBox(0, 10, 'Fill in', (e) => {
      /*if (e.charAt(e.length - 1) < '!' || e.charAt(e.length - 1) > '~') {
        e = ' '
      }*/
      inputText = e
    })
    announceUI.addButton(
      'Submit',
      0,
      -70,
      () => {
        resources.sceneMessageBus.emit('announcement', { text: inputText })
        /*if (inputText !== ' ') {
          resources.sceneMessageBus.emit('announcement', { text: inputText })
        }*/
        announceUI.hide()
      },
      ui.ButtonStyles.RED
    )
    announceUI.hide()

    kickPlayerUI = new ui.CustomPrompt('dark', 500, 250)
    kickPlayerUI.addText('Kick User', 0, 95, Color4.White(), 24)
    kickPlayerUI.addTextBox(0, 10, 'User Name', (e) => {
      inputText = e
    })
    kickPlayerUI.addButton(
      'Submit',
      0,
      -70,
      () => {
        resources.sceneMessageBus.emit('kick', { player: inputText })
        kickPlayerUI.hide()
      },
      ui.ButtonStyles.RED
    )
    kickPlayerUI.hide()

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        log('Action_3 button down', e)
        if (announceUI) {
          if (!announceUI.background.visible) {
            announceUI.show()
          } else {
            announceUI.hide()
          }
        }
      }
    )

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      (e) => {
        log('Secondary button down', e)
        if (kickPlayerUI) {
          if (!kickPlayerUI.background.visible) {
            kickPlayerUI.show()
          } else {
            kickPlayerUI.hide()
          }
        }
      }
    )
  }
}

resources.sceneMessageBus.on('announcement', (e) => {
  ui.displayAnnouncement(e.text)
})

resources.sceneMessageBus.on('kick', async (_e) => {
  if (!Attendee.data) {
    await setAttendeeData()
  }

  if (_e.player === Attendee.data.displayName) {
    await movePlayerTo({ x: 0, y: 5, z: 0 })
    const bb = new Entity()
    bb.addComponent(new BoxShape())
    bb.addComponent(
      new Transform({
        position: new Vector3(16, 9, 16),
        scale: new Vector3(31, 18, 31)
      })
    )
    engine.addEntity(bb)
    ui.displayAnnouncement('You have been kicked from this scene', 5)
    /*try {
      const url =
        'http://localhost:5001/lovehoney-popup-shop-e66b2/us-central1/app/add-blocked_user'
      const body = JSON.stringify({
        id: (await Attendee.data).userId
      })
      log('body to send to db: ', body)
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
      return response.json()
    } catch (e) {
      log('error posting to server ', e)
    }*/
  }
})

export async function CheckBlockedUsers() {
  const dataBase =
    'http://localhost:5001/lovehoney-popup-shop-e66b2/us-central1/app/get-blocked_users'
  let user: any
  try {
    const response = await fetch(dataBase)
    const json = await response.json()
    for (user of json) {
      if (user.id === Attendee.data.userId) {
        await movePlayerTo({ x: 0, y: 5, z: 0 })
        const bb = new Entity()
        bb.addComponent(new BoxShape())
        bb.addComponent(
          new Transform({
            position: new Vector3(16, 9, 16),
            scale: new Vector3(31, 18, 31)
          })
        )
        engine.addEntity(bb)
        Attendee.isBlocked = true
        DobUI.hide()
        ui.displayAnnouncement('You are not allowed to access this scene', 5)
        break
      }
    }
  } catch {
    log('error getting time data')
  }
}
