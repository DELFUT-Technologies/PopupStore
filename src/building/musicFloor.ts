import * as utils from '@dcl/ecs-scene-utils'
import resources, { Parent } from '../resources'

export class musicFloor extends Entity {
  audioSource: AudioSource

  constructor(
    clip: AudioClip,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.setParent(Parent)
    const shape = new PlaneShape()
    shape.withCollisions = false
    this.addComponent(shape)
    this.addComponent(transform)
    this.audioSource = new AudioSource(clip)
    this.audioSource.loop = true
    this.addComponent(this.audioSource)

    this.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          this.audioSource.playing = true
        },
        onCameraExit: () => {
          this.audioSource.playing = false
        }
      })
    )
  }
}

export function InitMusicFloor() {
  new musicFloor(
    resources.sounds.djRoom,
    new Transform({
      position: new Vector3(17, 13.3, 19),
      scale: new Vector3(0, 2, 0)
    }),
    resources.floorTriggers.djRoom
  )
  new musicFloor(
    resources.sounds.groundFloor,
    new Transform({
      position: new Vector3(16, 2, 16),
      scale: new Vector3(0, 1, 0)
    }),
    resources.floorTriggers.groundFloor
  )
  new musicFloor(
    resources.sounds.auctionRoom,
    new Transform({
      position: new Vector3(16, 9.5, 16),
      scale: new Vector3(0, 1, 0)
    }),
    resources.floorTriggers.auctionRoom
  )
}
