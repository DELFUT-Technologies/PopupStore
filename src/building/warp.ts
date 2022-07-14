import { movePlayerTo } from '@decentraland/RestrictedActions'
import { Parent } from 'src/resources'

export class warp extends Entity {
  constructor(transform: Transform) {
    super()

    engine.addEntity(this)
    this.setParent(Parent)
    this.addComponent(transform)
    const warp1 = new Entity()
    warp1.setParent(this)
    const warp2 = new Entity()
    warp2.setParent(this)
    const warp3 = new Entity()
    warp3.setParent(this)
    const warp4 = new Entity()
    warp4.setParent(this)

    // const color = new Color4(1, 0, 0, 0)
    // const transparent = new Material()
    // transparent.albedoColor = color
    const button_shape = new PlaneShape()
    button_shape.isPointerBlocker = false

    warp1.addComponent(button_shape)
    // warp1.addComponent(transparent)
    warp1.addComponent(
      new Transform({
        position: new Vector3(0, 0, 0),
        scale: new Vector3(0.22, 0.22, 0.22)
      })
    )
    warp1.addComponent(
      new OnPointerDown(
        () => {
          void movePlayerTo({ x: 16.3, y: 1, z: 16.3 })
        },
        { hoverText: 'warp to the Lovehoney Shop' }
      )
    )

    warp2.addComponent(button_shape)
    //warp2.addComponent(transparent)
    warp2.addComponent(
      new Transform({
        position: new Vector3(0, 0.27, 0),
        scale: new Vector3(0.22, 0.22, 0.22)
      })
    )
    warp2.addComponent(
      new OnPointerDown(
        () => {
          void movePlayerTo({ x: 16.3, y: 5, z: 16.3 })
        },
        { hoverText: 'warp to the Meeting Room' }
      )
    )
    warp3.addComponent(button_shape)
    //warp3.addComponent(transparent)
    warp3.addComponent(
      new Transform({
        position: new Vector3(0, 0.55, 0),
        scale: new Vector3(0.22, 0.22, 0.22)
      })
    )
    warp3.addComponent(
      new OnPointerDown(
        () => {
          void movePlayerTo({ x: 16.3, y: 8.3, z: 16.3 })
        },
        { hoverText: 'warp to the Art Gallery / Auction' }
      )
    )
    warp4.addComponent(button_shape)
    //warp4.addComponent(transparent)
    warp4.addComponent(
      new Transform({
        position: new Vector3(0, 0.8, 0),
        scale: new Vector3(0.22, 0.22, 0.22)
      })
    )
    warp4.addComponent(
      new OnPointerDown(
        () => {
          void movePlayerTo({ x: 15, y: 12.5, z: 23.5 })
        },
        { hoverText: 'warp to the Club' }
      )
    )
  }
}
export function InitWarp() {
  new warp( //1st_floor
    new Transform({
      position: new Vector3(15.6, 1.42, 14.805)
    })
  )
  new warp( //2nd_floor
    new Transform({
      position: new Vector3(15.6, 5.6, 14.805)
    })
  )
  new warp( //3rd_floor
    new Transform({
      position: new Vector3(15.6, 9.42, 14.805)
    })
  )
  new warp( //4th_floor
    new Transform({
      position: new Vector3(16.4, 13.2, 7.3)
    })
  )
}

export function InitWarp2() {
  const button_shape = new PlaneShape()
  button_shape.isPointerBlocker = false
  // warp from 1f to 4f
  const warp1f = new Entity()
  warp1f.addComponent(button_shape)
  warp1f.addComponent(
    new Transform({
      position: new Vector3(17.37, 1.71, 4.97),
      scale: new Vector3(0.3, 0.3, 0.3),
      rotation: Quaternion.Euler(0, 125, 0)
    })
  )
  warp1f.addComponent(
    new OnPointerDown(
      () => {
        void movePlayerTo({ x: 15, y: 12.5, z: 23.5 })
      },
      { hoverText: 'warp to the Club' }
    )
  )
  engine.addEntity(warp1f)
  // warp from 4f to 1f
  const warp4f = new Entity()
  warp4f.addComponent(button_shape)
  warp4f.addComponent(
    new Transform({
      position: new Vector3(15.6, 13.17, 24.7),
      scale: new Vector3(0.3, 0.3, 0.3)
    })
  )
  warp4f.addComponent(
    new OnPointerDown(
      () => {
        void movePlayerTo({ x: 16.8, y: 1, z: 5.6 })
      },
      { hoverText: 'warp to the Lovehoney Shop' }
    )
  )
  engine.addEntity(warp4f)
}
