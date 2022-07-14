import * as utils from '@dcl/ecs-scene-utils'
import {
  ElevatorDownSystem,
  ElevatorUpSystem,
  TriggerComponent,
  evTriggerShapeSpecial,
  InitEVAnnounceTriggers
} from './elevatorUtils'
import resources, {
  Elevator,
  GroundFloor,
  SecondFloor,
  ThirdFloor,
  JunctionFloor,
  Parent
} from '../resources'

const evFourToThree = new ElevatorDownSystem()
const evThreeToFour = new ElevatorUpSystem()
let duration: number

export function InitElevator() {
  // Elevator glb
  Elevator.evEntity.setParent(Parent)
  Elevator.evEntity.addComponent(resources.models.elevator)
  Elevator.evEntity.addComponent(
    new Transform({
      position: GroundFloor,
      rotation: Quaternion.Euler(0, 250, 0),
      scale: new Vector3(0.75, 0.75, 0.75)
    })
  )
  InitEVAnnounceTriggers()
  engine.addEntity(Elevator.evEntity)

  // "1" button takes you to the first floor if not already there
  resources.input.subscribe('BUTTON_DOWN', ActionButton.ACTION_3, false, () => {
    if (Elevator.currentPosition !== GroundFloor) {
      switch (Elevator.currentPosition) {
        case SecondFloor: {
          duration = 1.2
          break
        }
        case ThirdFloor: {
          duration = 1.7
          break
        }
        case JunctionFloor: {
          duration = 3
          break
        }
      }
      void moveElevator(GroundFloor, duration)
    }
  })
  // "2" button takes you to the second floor if not already there
  resources.input.subscribe('BUTTON_DOWN', ActionButton.ACTION_4, false, () => {
    switch (Elevator.currentPosition) {
      case JunctionFloor: {
        duration = 2
        break
      }
      case ThirdFloor: {
        duration = 0.8
        break
      }
      case GroundFloor: {
        duration = 1.2
        break
      }
    }
    if (Elevator.currentPosition !== SecondFloor) {
      void moveElevator(SecondFloor, duration)
    }
  })
  // "3" button takes you to the third floor if not already there
  resources.input.subscribe('BUTTON_DOWN', ActionButton.ACTION_5, false, () => {
    switch (Elevator.currentPosition) {
      case GroundFloor: {
        duration = 1.7
        break
      }
      case SecondFloor: {
        duration = 0.8
        break
      }
      default: {
        duration = 0.5
        break
      }
    }
    if (Elevator.currentPosition !== ThirdFloor) {
      void moveElevator(ThirdFloor, duration)
    }
  })
  // "4" button takes you to the fourth floor if not already there
  resources.input.subscribe('BUTTON_DOWN', ActionButton.ACTION_6, false, () => {
    switch (Elevator.currentPosition) {
      case ThirdFloor: {
        duration = 0.5
        break
      }
      case SecondFloor: {
        duration = 1.2
        break
      }
      case GroundFloor: {
        duration = 1.9
        break
      }
    }
    Elevator.toPosition = JunctionFloor
    if (Elevator.currentPosition !== JunctionFloor) {
      Elevator.moving = true
      Elevator.evEntity.addComponentOrReplace(
        new utils.MoveTransformComponent(
          Elevator.currentPosition,
          JunctionFloor,
          duration,
          () => {
            Elevator.currentPosition = JunctionFloor
            engine.addSystem(evThreeToFour)
          }
        )
      )
    }
  })
}

// Move Elevator to first, second, and third floors
function moveElevator(toPosition: Vector3, duration: number) {
  Elevator.toPosition = toPosition
  Elevator.moving = true
  if (Elevator.currentPosition.equals(JunctionFloor)) {
    TriggerComponent.shape = evTriggerShapeSpecial
    engine.addSystem(evFourToThree)
  } else {
    Elevator.evEntity.addComponentOrReplace(
      new utils.MoveTransformComponent(
        Elevator.currentPosition,
        toPosition,
        duration,
        () => {
          Elevator.moving = false
        }
      )
    )
  }
  Elevator.currentPosition = toPosition
}
