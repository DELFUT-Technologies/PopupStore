import resources, { ImageInfo } from './resources'
import { PlayCloseSound } from './booth/sounds'

export class LovehoneyUI {
  public container: UIContainerRect
  protected canvasBG: UIImage
  protected okButton: UIImage

  constructor(
    canvas: UICanvas,
    width: string,
    height: string,
    bg: Texture = resources.UIbackground
  ) {
    this.container = new UIContainerRect(canvas)
    this.container.width = width
    this.container.height = height

    this.canvasBG = new UIImage(this.container, bg)
    this.canvasBG.width = 600
    this.canvasBG.height = 568
    this.canvasBG.sourceLeft = 0
    this.canvasBG.sourceTop = 0
    this.canvasBG.sourceWidth = 1047
    this.canvasBG.sourceHeight = 980

    this.okButton = new UIImage(this.container, resources.button.ok)
    this.okButton.width = 220
    this.okButton.height = 55
    this.okButton.sourceWidth = 440
    this.okButton.sourceHeight = 111
    this.okButton.positionX = 8
    this.okButton.positionY = -150
    this.okButton.onClick = new OnPointerDown(() => {
      PlayCloseSound()
      this.hide()
    })
  }

  addText(
    value: string,
    posX: number,
    posY: number,
    color: Color4,
    size: number
  ) {
    const txt = new UIText(this.canvasBG)
    txt.value = value
    txt.positionX = posX + 8
    txt.positionY = posY
    txt.color = Color4.White()
    txt.fontSize = size
    txt.width = 400
    txt.adaptWidth = false
    txt.textWrapping = true
  }

  addButton(info: ImageInfo, onClick: () => void, hoverText?: string) {
    const button = new UIImage(this.container, info.imageTexture)
    button.width = info.width
    button.height = info.height
    button.sourceWidth = info.srcW
    button.sourceHeight = info.srcH
    button.positionX = info.posX
    button.positionY = info.posY
    button.sourceLeft = info.srcL ? info.srcL : 0
    button.sourceTop = info.srcT ? info.srcL : 0
    button.onClick = new OnPointerDown(onClick, { hoverText: hoverText })
  }

  addIcon(info: ImageInfo) {
    const icon = new UIImage(this.container, info.imageTexture)
    icon.width = info.width
    icon.height = info.height
    icon.sourceWidth = info.srcW
    icon.sourceHeight = info.srcH
    icon.positionX = info.posX
    icon.positionY = info.posY
    icon.sourceLeft = info.srcL ? info.srcL : 0
    icon.sourceTop = info.srcT ? info.srcT : 0
    return icon
  }

  addTextBox(
    posX: number,
    posY: number,
    placeholder: string,
    onChanged: (e: any) => void
  ) {
    const input = new UIInputText(this.canvasBG)
    input.width = '250px'
    input.height = '50px'
    input.hAlign = 'middle'
    input.fontSize = 25
    input.positionX = posX
    input.positionY = posY
    input.vTextAlign = 'middle'
    input.hTextAlign = 'middle'
    input.placeholder = placeholder
    input.onChanged = new OnChanged(onChanged)
  }

  hide() {
    this.container.visible = false
  }
  unhide() {
    this.container.visible = true
  }
  hideOkButton() {
    this.okButton.visible = false
  }
}
