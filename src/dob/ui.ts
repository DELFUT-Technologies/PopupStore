import resources, { Attendee, BuildingBlocker } from '../resources'
import { PlayOpenSound } from '../booth/sounds'
import { LovehoneyUI } from '../LovehoneyUi'
import {
  DobEnjoyText,
  DobInput,
  DobSorryText,
  DobText,
  DobThankYouText
} from './uiResources'

class dobUI extends LovehoneyUI {
  private yearBox: UIInputText
  private monthBox: UIInputText
  private dayBox: UIInputText
  private year: number = 0
  private month: number = 0
  private day: number = 0

  constructor(canvas: UICanvas, width: string, height: string) {
    super(canvas, width, height)

    this.addIcon(DobText)
    const dob = this.addIcon(DobInput)

    this.yearBox = new UIInputText(dob)
    this.yearBox.visible = this.container.visible
    this.yearBox.width = '125px'
    this.yearBox.height = '54px'
    this.yearBox.hAlign = 'left'
    this.yearBox.fontSize = 30
    this.yearBox.vTextAlign = 'middle'
    this.yearBox.hTextAlign = 'middle'
    this.yearBox.focusedBackground = Color4.FromInts(0, 0, 0, 0)
    this.yearBox.placeholder = 'yyyy'
    this.yearBox.onChanged = new OnChanged((x) => {
      this.year = +x.value
    })

    this.monthBox = new UIInputText(dob)
    this.monthBox.visible = this.container.visible
    this.monthBox.width = '67px'
    this.monthBox.height = '54px'
    this.monthBox.hAlign = 'middle'
    this.monthBox.fontSize = 30
    this.monthBox.positionX = 29
    this.monthBox.vTextAlign = 'middle'
    this.monthBox.hTextAlign = 'middle'
    this.monthBox.focusedBackground = Color4.FromInts(0, 0, 0, 0)
    this.monthBox.placeholder = 'mm'
    this.monthBox.onChanged = new OnChanged((x) => {
      this.month = +x.value
    })

    this.dayBox = new UIInputText(dob)
    this.dayBox.visible = this.container.visible
    this.dayBox.width = '67px'
    this.dayBox.height = '54px'
    this.dayBox.hAlign = 'middle'
    this.dayBox.fontSize = 30
    this.dayBox.positionX = 107
    this.dayBox.vTextAlign = 'middle'
    this.dayBox.hTextAlign = 'middle'
    this.dayBox.focusedBackground = Color4.FromInts(0, 0, 0, 0)
    this.dayBox.placeholder = 'dd'
    this.dayBox.onChanged = new OnChanged((x) => {
      this.day = +x.value
    })

    this.okButton.onClick = new OnPointerDown(() => {
      this.confirmDOB()
    })
  }

  confirmDOB() {
    this.hide()
    if (!Attendee.age) this.initAge()
    if (Attendee.age >= 18) {
      engine.removeEntity(BuildingBlocker)
      PlayOpenSound()
      const ui = new LovehoneyUI(resources.canvas, '600px', '600px')
      ui.addIcon(DobThankYouText)
      ui.addIcon(DobEnjoyText)
      ui.unhide()
    } else {
      PlayOpenSound()
      const ui = new LovehoneyUI(resources.canvas, '600px', '600px')
      ui.addIcon(DobSorryText)
      ui.unhide()
    }
    this.clearUI()
  }

  initAge() {
    if (!this.year || !this.day || !this.month) return
    const today = new Date()
    const thisMonth = today.getMonth() + 1

    Attendee.age = today.getFullYear() - this.year
    if (
      Attendee.age === 18 &&
      (this.month > thisMonth ||
        (this.month === thisMonth && this.day > today.getDate()))
    )
      Attendee.age--
  }

  clearUI() {
    this.yearBox.value = ''
    this.monthBox.value = ''
    this.dayBox.value = ''
  }
}

export const DobUI = new dobUI(resources.canvas, '600px', '600px')
DobUI.hide()
