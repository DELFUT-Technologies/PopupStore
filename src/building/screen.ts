import resources, { Parent } from '../resources'
import * as utils from '@dcl/ecs-scene-utils'

export class screen extends Entity {
  public videoMaterial: Material

  constructor(
    videotexture: VideoTexture,
    transform: Transform,
    triggerShape: utils.TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.setParent(Parent)
    this.addComponent(new PlaneShape())
    this.addComponent(transform)

    videotexture.loop = true

    this.videoMaterial = new Material()
    this.videoMaterial.albedoTexture = videotexture
    this.videoMaterial.emissiveTexture = videotexture
    this.videoMaterial.roughness = 1
    this.videoMaterial.specularIntensity = 0
    this.videoMaterial.metallic = 0
    this.videoMaterial.emissiveColor = Color3.White()
    this.videoMaterial.emissiveIntensity = 0.6

    this.addComponent(this.videoMaterial)

    this.addComponent(
      new utils.TriggerComponent(triggerShape, {
        onCameraEnter: () => {
          videotexture.playing = true
        },
        onCameraExit: () => {
          videotexture.playing = false
        }
      })
    )
  }
}

// trigger box shape controls the distance from the item when the
// where the trigger starts
export function InitScreens() {
  // MP4 MUSIC???
  /*new screen( //DJ_music
    resources.videoTextures.DJ_music,
    new Transform({
      position: new Vector3(15, 13.3, 13),
      scale: new Vector3(0, 2, 0)
    }),
    new utils.TriggerBoxShape(new Vector3(25, 8.5, 25), new Vector3(0, 2.5, 0))
  )
  new screen( //ground_music
    resources.videoTextures.ground_music,
    new Transform({
      position: new Vector3(16, 2, 16),
      scale: new Vector3(0, 1, 0)
    }),
    new utils.TriggerBoxShape(new Vector3(32, 3, 32), Vector3.Zero())
  )*/
  new screen( //learning room1
    resources.videoTextures.video2,
    new Transform({
      position: new Vector3(16.85, 5.78, 22.55),
      scale: new Vector3(3, 1.3, 1),
      rotation: Quaternion.Euler(0, 5, 0)
    }),
    new utils.TriggerBoxShape(new Vector3(7, 2, 7), new Vector3(0, 1, -3.5))
  )
  new screen( //learning room2
    resources.videoTextures.video1,
    new Transform({
      position: new Vector3(17.43, 5.57, 14.64),
      scale: new Vector3(2.8, 1.8, 1),
      rotation: Quaternion.Euler(0, 160, 0)
    }),
    new utils.TriggerBoxShape(new Vector3(6, 2, 8), new Vector3(-1.2, 1, 4))
  )
  new screen( //learning room3
    resources.videoTextures.video3,
    new Transform({
      position: new Vector3(15.2, 5.8, 12.6),
      scale: new Vector3(3.7, 1.8, 1),
      rotation: Quaternion.Euler(0, -110, 0)
    }),
    new utils.TriggerBoxShape(new Vector3(6, 2, 7), new Vector3(3.5, 1, 0))
  )
}
