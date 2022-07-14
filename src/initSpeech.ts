import * as utils from '@dcl/ecs-scene-utils'
import resources, { Attendee, setAttendeeData } from './resources'

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

export async function InitSpeech() {
  const speechTrigger = new Entity()
  engine.addEntity(speechTrigger)
  speechTrigger.addComponent(
    new Transform({
      position: new Vector3(21.5, 4.5, 12.25),
      rotation: Quaternion.Euler(90, 0, 0)
    })
  )

  const shape = new PlaneShape()
  shape.withCollisions = false
  speechTrigger.addComponent(shape)

  const speech = new AudioSource(resources.sounds.speech)
  speech.loop = false
  speechTrigger.addComponent(speech)

  if (!Attendee.data.userId) {
    await setAttendeeData()
  }
  speechTrigger.addComponent(
    new utils.TriggerComponent(
      new utils.TriggerBoxShape(new Vector3(2, 2, 2), new Vector3(0, 1, 0)),
      {
        onCameraEnter: () => {
          for (const idx in administrators) {
            if (Attendee.data.publicKey === administrators[idx]) {
              resources.sceneMessageBus.emit('playSpeech', {})
              break
            }
          }
        },
        onCameraExit: () => {
          resources.sceneMessageBus.emit('stopSpeech', {})
        }
      }
    )
  )
  resources.sceneMessageBus.on('playSpeech', () => {
    speech.playing = true
  })
  resources.sceneMessageBus.on('stopSpeech', () => {
    speech.playing = false
  })
}
