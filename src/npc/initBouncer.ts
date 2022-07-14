import { Dialog, NPC, NPCDelay } from '@dcl/npc-scene-utils'
import resources, { Parent } from '../resources'
import { LovehoneyUI } from '../LovehoneyUi'
import { PlayCloseSound } from '../booth/sounds'
import {
  ArcWaveImage,
  arcWaveText,
  ButtPlugText,
  ButtPlugImage,
  EggImage,
  EggText,
  JunoText,
  KnicerVImage,
  KnickerText,
  LoveRingImage,
  LoveRingText,
  WomanizerImage,
  womanizerText,
  JunoCloseButton
} from './uiResources'
import { CloseButton, ShopNowButton } from '../quest/uiResources'

export let Bouncer: NPC
const dummyent = new Entity()
engine.addEntity(dummyent)

export function InitBouncer(): void {
  Bouncer = new NPC(
    {
      position: new Vector3(17.7, 1.3, 30.77),
      scale: new Vector3(1.1, 1.1, 1.1)
    },
    resources.models.betty,
    () => {
      Bouncer.playAnimation('Hello', false, 2)

      dummyent.addComponent(
        new NPCDelay(2, () => {
          Bouncer.playAnimation('Idle')
        })
      )

      // sound
      Bouncer.getComponent(AudioSource).playOnce()

      // dialog UI
      Bouncer.talk(bouncerDialog)
    },
    {
      faceUser: false,
      portrait: {
        path: 'images/betty.png',
        height: 256,
        width: 256,
        section: {
          sourceHeight: 512,
          sourceWidth: 512
        }
      },
      darkUI: true,
      hoverText: 'Find out about Lovehoney',
      onlyClickTrigger: true,
      onWalkAway: () => {
        Bouncer.playAnimation('Hello', true, 2)
      }
    }
  )
  Bouncer.setParent(Parent)

  Bouncer.addComponent(new AudioSource(resources.sounds.betty))
}

const bouncerDialog: Dialog[] = [
  {
    text: "Hello, I'm Betty - Welcome to our Lovehoney Popup Space!",
    offsetX: 40
  },
  {
    text: "If the graphics speed is slow change the Graphics Quality setting to 'Low' by clicking your profile picture in the top right corner",
    offsetX: 40
  },
  {
    text:
      'First and foremost, we care about your comfort and safety.\n' +
      'You can block other users by clicking their avatar.\n' +
      "Also, pressing the 'E' button will teleport you to a random parcel in Decentraland.",
    fontSize: 24,
    offsetX: 40,
    offsetY: -5
  },
  {
    text:
      'Secondly, keep your eyes out for the Lovehoney hearts around the ' +
      'shop. Collect all four and you will be able to access a 20% off ' +
      'discount code to be used at Lovehoney’s online store!',
    offsetX: 40
  },
  {
    text: 'Would you like to learn more about Lovehoney?',
    offsetX: 40,
    isQuestion: true,
    buttons: [
      { label: 'No', goToDialog: 5 },
      { label: 'Yes', goToDialog: 6 }
    ]
  },
  {
    text: "Okay, I'll be around if you get curious! We hope you discover a happier you.\n",
    offsetX: 40,
    isEndOfDialog: true,
    triggeredByNext: () => {
      Bouncer.playAnimation('Hello', true, 2)
    }
  },
  {
    fontSize: 23,
    offsetY: -8,
    offsetX: 40,
    text:
      'We at Lovehoney are the Sexual Happiness People and are on a mission to lead ' +
      "the world's pursuit of sexual happiness."
  },
  {
    text: 'Our space has four floors.',
    offsetX: 40
  },
  {
    text:
      'The ground floor is our shop.\nClick on any item to be taken to our official ' +
      'website for additional product information and buying options.',
    offsetX: 40
  },
  {
    fontSize: 23,
    offsetX: 40,
    text:
      "While you are there don't miss out on our beautiful and sexy lingerie, " +
      'the Arcwave Ion, or our Womanizer collection.',
    isQuestion: true,
    buttons: [
      { label: 'Womanizer', goToDialog: 11 },
      { label: 'Arcwave', goToDialog: 10 },
      { label: 'next', goToDialog: 12, offsetX: 110 }
    ]
  },
  {
    fontSize: 20,
    offsetX: 35,
    text:
      'The Arcwave Ion uses Pleasure Air Technology to deliver a new kind ' +
      'of stimulation. This sleek, modern stroker offers an experience that ' +
      "can't be matched.",
    isQuestion: true,
    buttons: [
      { label: 'Womanizer', goToDialog: 11 },
      {
        label: 'view',
        goToDialog: 10,
        triggeredActions: () => {
          const arcwave = new LovehoneyUI(resources.canvas, '600px', '600px')
          arcwave.hideOkButton()
          arcwave.addIcon(arcWaveText)
          arcwave.addIcon(ArcWaveImage)
          arcwave.addButton(ShopNowButton, () => {
            arcwave.hide()
            openExternalURL('https://www.lovehoney.co.uk/brands/arcwave/')
          })
          arcwave.addButton(CloseButton, () => {
            arcwave.hide()
            PlayCloseSound()
          })
        }
      },
      { label: 'next', goToDialog: 11, offsetX: 110 }
    ]
  },
  {
    fontSize: 20,
    offsetX: 40,
    text:
      "Using Womanizer's revolutionary Pleasure Air Technology, this sleek, ergonomic stimulator " +
      'offers contactless stimulation and new sensations.',
    isQuestion: true,
    buttons: [
      { label: 'Arcwave', goToDialog: 10 },
      {
        label: 'view',
        goToDialog: 11,
        triggeredActions: () => {
          const womanizer = new LovehoneyUI(resources.canvas, '600px', '600px')
          womanizer.hideOkButton()
          womanizer.addIcon(womanizerText)
          womanizer.addIcon(WomanizerImage)
          womanizer.addButton(ShopNowButton, () => {
            womanizer.hide()
            openExternalURL('https://www.lovehoney.co.uk/brands/womanizer/')
          })
          womanizer.addButton(CloseButton, () => {
            womanizer.hide()
            PlayCloseSound()
          })
        }
      },
      { label: 'next', goToDialog: 12, offsetX: 110 }
    ]
  },
  {
    offsetX: 40,
    text: 'A meeting room is located on the second floor. There you can learn more about sexual health and wellness.'
  },
  {
    offsetX: 40,
    text: 'On the third floor you will find our NFT art auction. View erotic art and bid for the NFT on OpenSea.'
  },
  {
    offsetX: 40,
    text: 'Last, but not least get a first-hand view of our music-activated vibrator, Juno, on the fourth floor',
    isQuestion: true,
    buttons: [
      { label: 'next', goToDialog: 15 },
      {
        label: 'View',
        goToDialog: 13,
        triggeredActions: () => {
          const juno = new LovehoneyUI(
            resources.canvas,
            '600px',
            '600px',
            new Texture('images/Lovehoney_Base100_220607NoLogo.png')
          )
          juno.hideOkButton()
          juno.addButton(JunoCloseButton, () => {
            juno.hide()
          })
          juno.addIcon(JunoText)
          juno.addIcon(KnickerText)
          juno.addButton(
            KnicerVImage,
            () => {
              openExternalURL(
                'https://www.lovehoney.co.uk/sex-toys/vibrators/vibrating-knickers/p/lovehoney-juno-rechargeable-music-activated-knicker-vibrator/a44393g80014.html'
              )
            },
            'Shop Now'
          )
          juno.addIcon(LoveRingText)
          juno.addButton(
            LoveRingImage,
            () => {
              openExternalURL(
                'https://www.lovehoney.co.uk/sex-toys/cock-rings/vibrating-cock-rings/p/lovehoney-juno-rechargeable-music-activated-vibrating-love-ring/a44396g80017.html'
              )
            },
            'Shop Now'
          )
          juno.addIcon(ButtPlugText)
          juno.addButton(
            ButtPlugImage,
            () => {
              openExternalURL(
                'https://www.lovehoney.co.uk/sex-toys/butt-plugs/vibrating-butt-plugs/p/lovehoney-juno-rechargeable-music-activated-vibrating-butt-plug/a44395g80016.html'
              )
            },
            'Shop Now'
          )
          juno.addIcon(EggText)
          juno.addButton(
            EggImage,
            () => {
              openExternalURL(
                'https://www.lovehoney.co.uk/sex-toys/love-eggs-jiggle-balls/vibrating-love-eggs/p/lovehoney-juno-rechargeable-music-activated-vibrating-egg/a44394g80015.html'
              )
            },
            'Shop Now'
          )
        }
      }
    ]
  },
  {
    offsetX: 40,
    text: 'Thank you for visiting the Lovehoney popup space. We hope you discover a happier you!',
    triggeredByNext: () => {
      Bouncer.playAnimation('Hello', true, 2)
    },
    isEndOfDialog: true
  }
]
