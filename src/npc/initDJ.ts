import { Dialog, NPC } from '@dcl/npc-scene-utils'
import resources, { Parent } from '../resources'

export let DJ: NPC
let message: number = 0

export function InitDJ(): void {
  DJ = new NPC(
    {
      position: new Vector3(13.3, 12, 21.3),
      //position: new Vector3(1, 1, 1),
      rotation: Quaternion.Euler(0, 160, 0)
    },
    resources.models.marsha,
    () => {
      audioSource.playOnce()

      // dialog UI
      switch (message) {
        case 0: {
          DJ.talk(introMessage)
          break
        }
        case 1: {
          DJ.talk(messageOne)
          break
        }
        case 2: {
          DJ.talk(messageTwo)
          break
        }
        case 3: {
          DJ.talk(messageThree)
          break
        }
        case 4: {
          DJ.talk(messageFour)
          break
        }
      }
    },
    {
      faceUser: false,
      portrait: {
        path: 'images/marsha.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 512,
          sourceWidth: 512
        }
      },
      darkUI: true,
      hoverText: 'Find out about Juno',
      onlyClickTrigger: true
    }
  )
  const audioSource = new AudioSource(resources.sounds.marsha)
  audioSource.volume = 0.1
  DJ.addComponent(audioSource)
  DJ.playAnimation('ArmatureAction', false)
  DJ.setParent(Parent)
}

const randomPoints: string[] = [
  'Did you know... \nThere are four toys in the Juno range, giving everyone something to play with. The range includes a knicker vibrator, bullet, love ring and butt plug. ',
  'Did you know... \nThe Juno range lets you literally ‘feel the music’, each toy vibrates in time with your favourite track.',
  'Did you know... \nAs well as having fun with music, the toys come with a remote control on a lanyard, letting you take control and have fun on the go too.',
  'Did you know... \nThe toys also work with ambient music and words too. Why not try some poetry to mix things up!'
]

function updateMessage() {
  message++
  if (message === 5) {
    message = 1
  }
}

const introMessage: Dialog[] = [
  {
    text: 'Welcome to Lovehoney’s DJ room, celebrating the new music activated toy, Juno.',
    offsetX: 40
  },
  /*{
    text: 'Did you know...',
    offsetX: 40
  },*/
  {
    text: randomPoints[0],
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      updateMessage()
    }
  }
]

const messageOne: Dialog[] = [
  /*{
    text: 'Did you know...',
    offsetX: 40
  },*/
  {
    text: randomPoints[1],
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      updateMessage()
    }
  }
]

const messageTwo: Dialog[] = [
  /*{
    text: 'Did you know...',
    offsetX: 40
  },*/
  {
    text: randomPoints[2],
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      updateMessage()
    }
  }
]

const messageThree: Dialog[] = [
  /*{
    text: 'Did you know...',
    offsetX: 40
  },*/
  {
    text: randomPoints[3],
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      updateMessage()
    }
  }
]

const messageFour: Dialog[] = [
  /*{
    text: 'Did you know...',
    offsetX: 40
  },*/
  {
    text: randomPoints[0],
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      updateMessage()
    }
  }
]
