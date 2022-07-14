import resources, { ImageInfo } from '../resources'
import { LovehoneyUI } from '../LovehoneyUi'

export const QuestItemScale = new Vector3(0.2, 0.2, 0.2)
export const TotalQuestItems = 4

// Button Image Info
export const CloseButton: ImageInfo = {
  imageTexture: resources.button.close,
  width: 200,
  height: 50,
  srcW: 440,
  srcH: 111,
  posX: 110,
  posY: -140
}

export const ShopNowButton: ImageInfo = {
  imageTexture: resources.button.shopNow,
  width: 200,
  height: 50,
  srcW: 440,
  srcH: 111,
  posX: -120,
  posY: -140
}

// Text Image Info
export const CongratsText: ImageInfo = {
  imageTexture: resources.text.questFin,
  width: 384,
  height: 148,
  srcW: 615,
  srcH: 237,
  posX: 0,
  posY: 20
}

export const Quest1of4: ImageInfo = {
  imageTexture: resources.text.quest1of4,
  width: 384,
  height: 148,
  srcW: 614,
  srcH: 237,
  posX: 0,
  posY: 0
}

export const Quest2of4: ImageInfo = {
  imageTexture: resources.text.quest2of4,
  width: 389,
  height: 148,
  srcW: 622,
  srcH: 236,
  posX: 0,
  posY: 0
}

export const Quest3of4: ImageInfo = {
  imageTexture: resources.text.quest3of4,
  width: 389,
  height: 148,
  srcW: 623,
  srcH: 237,
  posX: 0,
  posY: 0
}

export const discountCode: ImageInfo = {
  imageTexture: resources.text.discountCode,
  width: 154,
  height: 35,
  srcW: 247,
  srcH: 56,
  posX: 0,
  posY: -80
}

// Quest UI
export const QuestItem1 = new LovehoneyUI(resources.canvas, '600px', '600px')
QuestItem1.addIcon(Quest1of4)
QuestItem1.hide()

export const QuestItem2 = new LovehoneyUI(resources.canvas, '600px', '600px')
QuestItem2.addIcon(Quest2of4)
QuestItem2.hide()

export const QuestItem3 = new LovehoneyUI(resources.canvas, '600px', '600px')
QuestItem3.addIcon(Quest3of4)
QuestItem3.hide()

export const QuestSuccess = new LovehoneyUI(resources.canvas, '600px', '600px')
QuestSuccess.addIcon(CongratsText)
QuestSuccess.addButton(ShopNowButton, () => {
  openExternalURL('https://www.lovehoney.co.uk/')
})
QuestSuccess.addButton(CloseButton, () => {
  QuestSuccess.hide()
})
QuestSuccess.addIcon(discountCode)
QuestSuccess.hideOkButton()
QuestSuccess.hide()
