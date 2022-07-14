import resources from '../resources'
import { PickupItem } from './ui'

export function InitQuest() {
  const itemPickupSound = new Entity()
  engine.addEntity(itemPickupSound)
  itemPickupSound.addComponent(new Transform())
  itemPickupSound.addComponent(new AudioSource(resources.sounds.itemPickup))
  itemPickupSound.setParent(Attachable.AVATAR)

  // Floor 1 item
  new PickupItem(
    new Transform({
      position: new Vector3(17.21, 0.96, 20.2),
      rotation: Quaternion.Euler(0, 22, 0),
      scale: new Vector3(0.75, 0.3, 0.1)
    })
  )

  // Floor 2 item
  new PickupItem(
    new Transform({
      position: new Vector3(11.53, 5.36, 21.44),
      rotation: Quaternion.Euler(0, 75, 0),
      scale: new Vector3(0.75, 0.3, 0.1)
    })
  )

  // Floor 3 item
  new PickupItem(
    new Transform({
      position: new Vector3(22.85, 10.45, 8.75),
      rotation: Quaternion.Euler(0, 25, 0),
      scale: new Vector3(0.75, 0.3, 0.1)
    })
  )

  // Floor 4 item
  new PickupItem(
    new Transform({
      position: new Vector3(15.15, 13.36, 9.18),
      rotation: Quaternion.Euler(0, 7, 0),
      scale: new Vector3(0.75, 0.3, 0.1)
    })
  )
}
