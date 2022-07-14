import * as utils from '@dcl/ecs-scene-utils'
import * as UI from '@dcl/ui-scene-utils'
import { PlayCloseSound, PlayCoinSound, PlayOpenSound } from './sounds'
import { LovehoneyUI } from '../LovehoneyUi'
import resources, { ImageInfo } from '../resources'
import {
  CancelButton,
  CaptchaFinText,
  FillCaptchaText,
  GetMMButton,
  MMRequiredText,
  SeePoapsButton,
  SubmitButton
} from './uiResources'

// Wait a certain amount of time before allowing poap to be received
export function timerBeforeClaim(createdTime: Date, delay: number) {
  const mmPrompt = new UI.CustomPrompt(undefined, 450, 200)
  const timeRemaining = (+createdTime - +new Date() + delay) / 1000
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = Math.floor(timeRemaining - minutes * 60)
  mmPrompt.addText(
    `Please explore\n ${
      minutes ? `${minutes} minutes${seconds > 0 ? ' and ' : ''}` : ''
    }${seconds ? `${seconds} seconds` : ''}\n more before claiming this POAP`,
    0,
    0,
    Color4.Black(),
    20
  )
}

// UI asking to install metamask //
export function metamask() {
  PlayOpenSound()
  const mmPrompt = new LovehoneyUI(resources.canvas, '600px', '600px')
  mmPrompt.hideOkButton()
  mmPrompt.addIcon(MMRequiredText)
  mmPrompt.addButton(GetMMButton, () => {
    openExternalURL('https://metamask.io/')
  })
  mmPrompt.addButton(CancelButton, () => {
    PlayCloseSound()
    mmPrompt.hide()
  })
}

// UI asking for captcha solution //
export async function captcha(
  serverURL: string,
  captchaUUID: string
): Promise<string | undefined> {
  return new Promise((resolve) => {
    const captchaUI = new LovehoneyUI(resources.canvas, '600px', '600px')
    captchaUI.hideOkButton()
    //captchaUI.addText('Please complete this captcha', 0, 90, Color4.White(), 24)
    captchaUI.addIcon(FillCaptchaText)
    const captchaImage: ImageInfo = {
      imageTexture: new Texture(`https://${serverURL}/captcha/${captchaUUID}`),
      width: 350,
      height: 100,
      srcW: 500,
      srcH: 150,
      posX: 0,
      posY: 0
    }
    captchaUI.addIcon(captchaImage)
    let captchaCode = ''
    captchaUI.addTextBox(0, -80, 'Fill in', (e) => {
      captchaCode = e.value
    })
    captchaUI.addButton(SubmitButton, () => {
      captchaUI.hide()
      log(captchaCode)
      resolve(captchaCode)
    })
    captchaUI.addButton(CancelButton, () => {
      captchaUI.hide()
      resolve(undefined)
    })
  })
}

export function alreadyClaimed() {
  PlayOpenSound()
  const prompt = new LovehoneyUI(resources.canvas, '600px', '600px')
  prompt.hideOkButton()
  prompt.addIcon(CaptchaFinText)
  prompt.addButton(SeePoapsButton, () => {
    openExternalURL('https://app.poap.xyz')
  })

  prompt.addButton(CancelButton, () => {
    prompt.hide()
    PlayCloseSound()
  })
}

export function viewSuccessMessage(
  poapName: string,
  image: string,
  imageSizeX: number,
  imageSizeY: number
) {
  PlayCoinSound()

  const thumbTexture = new Texture(image, { hasAlpha: true })

  const name = new UIText(UI.canvas)
  name.value = poapName
  name.color = Color4.Yellow()
  name.outlineColor = Color4.Black()
  name.outlineWidth = 0.1
  name.positionY = -85
  name.visible = true
  name.fontSize = 30
  name.hTextAlign = 'center'
  name.hAlign = 'center'

  const thumb = new UIImage(UI.canvas, thumbTexture)
  thumb.hAlign = 'center'
  thumb.vAlign = 'center'
  thumb.positionY = 90
  thumb.width = 256
  thumb.height = 256
  thumb.sourceLeft = 0
  thumb.sourceTop = 0
  thumb.sourceHeight = imageSizeY
  thumb.sourceWidth = imageSizeX
  thumb.visible = true

  const note = new UIText(UI.canvas)
  note.value = 'This POAP token is being sent to your wallet'
  note.color = Color4.Black()
  note.positionY = -128
  note.visible = true
  note.fontSize = 30
  note.hTextAlign = 'center'
  note.hAlign = 'center'

  utils.setTimeout(7000, () => {
    name.visible = false
    thumb.visible = false
    note.visible = false
  })
}
