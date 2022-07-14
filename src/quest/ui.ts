import { Attendee, ClickerPlane, Parent } from '../resources'
import {
  QuestItem1,
  QuestItem2,
  QuestItem3,
  QuestSuccess,
  TotalQuestItems
} from './uiResources'

const quest = [QuestSuccess, QuestItem1, QuestItem2, QuestItem3]

export class PickupItem extends Entity {
  questID: number

  constructor(transform: Transform) {
    super()
    this.setParent(Parent)
    this.questID = 0

    this.addComponent(ClickerPlane)

    this.addComponent(transform)

    this.addComponent(
      new OnPointerDown(
        () => {
          if (!this.questID) {
            Attendee.questItems++
            this.questID = Attendee.questItems
          }
          if (Attendee.questItems === TotalQuestItems) {
            quest[0].unhide()
          } else {
            //displayQuestInfo(this.questID)
            quest[this.questID].unhide()
          }
        },
        {
          hoverText: 'Explore',
          showFeedback: true
        }
      )
    )
    engine.addEntity(this)
  }
}
