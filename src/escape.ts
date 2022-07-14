// button event of avoidance
import { Bouncer } from './npc/initBouncer'
import resources, { Attendee } from './resources'

resources.input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, false, () => {
  //movePlayerTo({ x: 1, y: 0, z: 1 }, { x: 8, y: 1, z: 8 })
  if (!Bouncer.dialog.isDialogOpen && !Attendee.isAdmin) {
    const random1 = Math.floor(Math.random() * 150) - 150
    const random2 = Math.floor(Math.random() * 150) - 150
    const x = random1.toString()
    const y = random2.toString()
    const xy = x + ',' + y
    teleportTo(xy)
    //teleportTo('20,18')
  }
})
