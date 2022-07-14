import * as utils from '@dcl/ecs-scene-utils'
import * as UI from '@dcl/ui-scene-utils'
import {
  Elevator,
  GroundFloor,
  JunctionFloor,
  Parent,
  SecondFloor,
  ThirdFloor
} from '../resources'

// Trigger info
const triggerSize = new Vector3(7, 4, 7)
export const evTriggerOnCameraEnter: utils.TriggerData = {
  onCameraEnter: () => {
    if (!Elevator.moving) {
      UI.displayAnnouncement(
        `Press 1, 2, 3, or 4 to move the elevator to that floor`,
        3,
        Color4.White(),
        20,
        false
      )
    }
  }
}
export const evTriggerShape = new utils.TriggerBoxShape(
  triggerSize,
  new Vector3(-1, 0.5, 1.5)
)
export const evTriggerShapeSpecial = new utils.TriggerBoxShape(
  triggerSize,
  new Vector3(0, 0.5, -1.5)
)
export const TriggerComponent = new utils.TriggerComponent(
  evTriggerShape,
  evTriggerOnCameraEnter
)

// Third to fourth and fourth to third floor movement
let i: number = 0
const udScale = 0.13
const fbScale = 0.08
const lrScale = 0.18
const totalFrames = 25
const dtAngle = 170

function duration(): number {
  switch (Elevator.toPosition) {
    case GroundFloor: {
      return 1.9
    }
    case SecondFloor: {
      return 1.2
    }
    case ThirdFloor: {
      return 0.5
    }
  }
}
export class ElevatorDownSystem {
  update(dt: number) {
    const evTransform = Elevator.evEntity.getComponent(Transform)
    if (i === totalFrames) {
      engine.removeSystem(this)
      Elevator.evEntity.addComponentOrReplace(
        new utils.MoveTransformComponent(
          JunctionFloor,
          Elevator.toPosition,
          duration(),
          () => {
            Elevator.moving = false
            utils.setTimeout(2000, () => {
              TriggerComponent.shape = evTriggerShape
            })
          }
        )
      )
      i = 0
    }
    evTransform.rotate(Vector3.Down(), dt * dtAngle)
    const udDistance = Vector3.Down().scale(udScale)
    const fbDistance = Vector3.Forward().scale(fbScale)
    const lrDistance = Vector3.Right().scale(lrScale)
    evTransform.translate(udDistance)
    evTransform.translate(fbDistance)
    evTransform.translate(lrDistance)
    i++
  }
}

export class ElevatorUpSystem {
  update(dt: number) {
    const evTransform = Elevator.evEntity.getComponent(Transform)
    if (i === totalFrames) {
      engine.removeSystem(this)
      Elevator.currentPosition = JunctionFloor
      Elevator.moving = false
      utils.setTimeout(2000, () => {
        TriggerComponent.shape = evTriggerShapeSpecial
      })
      i = 0
    }
    evTransform.rotate(Vector3.Up(), dt * dtAngle)
    const udDistance = Vector3.Up().scale(udScale)
    const fbDistance = Vector3.Backward().scale(fbScale)
    const lrDistance = Vector3.Left().scale(lrScale)
    evTransform.translate(udDistance)
    evTransform.translate(fbDistance)
    evTransform.translate(lrDistance)
    i++
  }
}

const origin: Vector3 = new Vector3(0, 0, 0)
class evAnnounceTrigger extends Entity {
  constructor(size: Vector3, position: Vector3) {
    super()
    engine.addEntity(this)
    this.addComponent(new Transform({ position: origin }))
    this.addComponent(
      new utils.TriggerComponent(
        new utils.TriggerBoxShape(size, position),
        evTriggerOnCameraEnter
      )
    )
  }
}
export function InitEVAnnounceTriggers() {
  // On / Near EV
  Elevator.evEntity.addComponent(TriggerComponent)
  // Enter scene corner West
  new evAnnounceTrigger(new Vector3(2, 4, 5), new Vector3(1, 0, 2.5))
  // Enter scene corner South
  new evAnnounceTrigger(new Vector3(4, 4, 2), new Vector3(2.5, 0, 1))
  // 2nd floor
  new evAnnounceTrigger(new Vector3(4, 2, 4), new Vector3(12.7, 6, 11.5))
  // 3rd floor
  new evAnnounceTrigger(new Vector3(4, 2, 4), new Vector3(12, 8.4, 14))
  // 4th floor
  new evAnnounceTrigger(new Vector3(4, 2, 4), new Vector3(12, 13.06, 18.5))
}
