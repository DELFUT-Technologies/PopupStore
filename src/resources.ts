import { getUserData, UserData } from '@decentraland/Identity'
import * as utils from '@dcl/ecs-scene-utils'

// Create Parent
export const Parent = new Entity()
//Parent.addComponent(new Transform({ position: new Vector3(0, 0, 0) }))
Parent.addComponent(
  new Transform({
    position: new Vector3(32, 0, 32),
    rotation: Quaternion.Euler(0, 180, 0)
  })
)
engine.addEntity(Parent)

// Init UserData
export type User = {
  data: UserData
  age: number
  questItems: number
  isAdmin: boolean
  isBlocked: boolean
}
export const Attendee: User = {
  data: {} as UserData,
  age: 0,
  questItems: 0,
  isAdmin: false,
  isBlocked: false
}
export async function setAttendeeData() {
  const data = await getUserData()
  if (data) {
    Attendee.data = data
  }
}

// Init building restriction
export const BuildingBlocker = new Entity()
const boxShape = new BoxShape()
boxShape.visible = false
BuildingBlocker.addComponent(boxShape)
BuildingBlocker.addComponent(
  new Transform({
    position: new Vector3(16, 9, 16),
    scale: new Vector3(31, 18, 31)
  })
)

// Create image info type
export type ImageInfo = {
  imageTexture: Texture
  width: number
  height: number
  srcW: number
  srcH: number
  posX: number
  posY: number
  srcL?: number
  srcT?: number
}

// Init Elevator info
export const GroundFloor = new Vector3(24, 0.06, 28)
export const SecondFloor = new Vector3(24, 2.9, 21.4)
export const ThirdFloor = new Vector3(25.5, 5.7, 17.1)
export const JunctionFloor = new Vector3(25.7, 8, 14.38)

export type EVdata = {
  evEntity: Entity
  currentPosition: Vector3
  toPosition: Vector3
  moving: boolean
}

export const Elevator: EVdata = {
  evEntity: new Entity(),
  currentPosition: GroundFloor,
  toPosition: GroundFloor,
  moving: false
}

// CLICKER shapes
export const ClickerPlane = new PlaneShape()
ClickerPlane.isPointerBlocker = false
export const ClickerBox = new BoxShape()
ClickerBox.isPointerBlocker = false

export const QuestAnimation = new AnimationState('Animation', {
  looping: true,
  layer: 2
})

// Init resource defaults
export default {
  models: {
    popUpStore: new GLTFShape('models/popup-store_haji20220712_2041.glb'),
    elevator: new GLTFShape('models/EV_withCollider_edited.glb'),
    betty: 'models/Robots_betty_4M_0T_1050Tris.glb',
    marsha: 'models/Robots_marsha_5M_0T_1140Tris.glb',
    sm: new GLTFShape('models/twitterIInstagram__tiktok.glb'),
    juno1: new GLTFShape('models/pop_music_fin_0704_objC.glb'),
    juno2: new GLTFShape('models/pop_music_fin_0704_objA.glb'),
    juno3: new GLTFShape('models/pop_music_fin_0704_objB.glb'),
    juno4: new GLTFShape('models/pop_music_fin_0704_objD.glb')
  },
  sounds: {
    itemPickup: new AudioClip('sounds/itemPickup.mp3'),
    betty: new AudioClip('sounds/betty.mp3'),
    marsha: new AudioClip('sounds/marsha.mp3'),
    groundFloor: new AudioClip('sounds/CW-Delusional-instrumental.mp3'),
    auctionRoom: new AudioClip('sounds/CW-Delusional-feat-Mikey-Jose.mp3'),
    djRoom: new AudioClip(
      'sounds/415511__jpmusic82__melody-loop-mix-128-bpm.mp3'
    ),
    speech: new AudioClip('sounds/Bryony Cole Lovehoney Metaverse.mp3')
  },
  UIbackground: new Texture('images/Lovehoney_UI_empty_220503.png'),
  text: {
    dobInput: new Texture('images/Lovehoney_UIrev01_220505_column.png'),
    dob: new Texture('images/YouMustBe18_220522.png'),
    thankYou: new Texture('images/ThankyouForConfriming_220518.png'),
    enjoy: new Texture('images/PleaseEnjoy_220518.png'),
    sorry: new Texture('images/WeAreSorry_220522.png'),
    mmRequired: new Texture('images/MetamaskDigital_220518.png'),
    filCaptcha: new Texture('images/PleaseComplete_220518.png'),
    captchaFin: new Texture('images/YouAlreadyRequested_220518.png'),
    questFin: new Texture('images/Lovehoney_congratulation04_text_220530.png'),
    quest3of4: new Texture('images/Lovehoney_congratulation03_text_220530.png'),
    quest2of4: new Texture('images/Lovehoney_congratulation02_text_220530.png'),
    quest1of4: new Texture('images/Lovehoney_congratulation01_text_220530.png'),
    discountCode: new Texture('images/Lovehoney_LHMETA_text_220607.png'),
    arcwave: new Texture('images/Lovehoney_Arcwave_text_220607.png'),
    womanizer: new Texture('images/Lovehoney_WomanizerDuo_text_220607.png'),
    juno: new Texture('images/Juno_name220611.png'),
    egg: new Texture('images/Egg_name220611.png'),
    knickerV: new Texture('images/KnickerVibrator_name220611.png'),
    loveRing: new Texture('images/LoveRing_name_220607.png'),
    buttPlug: new Texture('images/ButtPlug_name_220607.png')
  },
  button: {
    getMM: new Texture('images/button_GetmetaMask_purple_L_220516.png'),
    seePoaps: new Texture('images/button_SeeMyPOAPS_purple_220516.png'),
    ok: new Texture('images/button_OK_L_220516.png'),
    submit: new Texture('images/button_submit_purple_L_220516.png'),
    cancel: new Texture('images/button_CANCEL_L_220516.png'),
    close: new Texture('images/button_Close_gray_L_220522.png'),
    shopNow: new Texture('images/button_shopunowpurple_L_220530.png')
  },
  item: {
    arcwave: new Texture(
      'images/ARC_Ion_Black_ProductImage_perspective_GLOB.png'
    ),
    womanizer: new Texture('images/WMZ-Duo-Black-Product-Image-4.png'),
    knickerV: new Texture('images/junoKnickerVibrator2.png'),
    loveRing: new Texture('images/junoLoveRing.png'),
    buttPlug: new Texture('images/junoButtPlug.png'),
    egg: new Texture('images/junoEgg.png')
  },
  videoTextures: {
    video1: new VideoTexture( //Cam Fraser
      new VideoClip(
        'https://player.vimeo.com/external/726408917.m3u8?s=7a4216c4a396534ff734a37bdd1b3b7161c33e6f'
      )
    ),
    video2: new VideoTexture( //Oloni
      new VideoClip(
        'https://player.vimeo.com/external/726404611.m3u8?s=8099fbc30b641ecebdca27eddc447294c007eab7'
      )
    ),
    video3: new VideoTexture( //Zach Zane
      new VideoClip(
        'https://player.vimeo.com/external/726403210.m3u8?s=3c01321f5805b9bd6d3067668d968877b2c91951'
      )
    ),
    tmp: new VideoTexture(
      new VideoClip(
        'https://player.vimeo.com/external/714665771.m3u8?s=2248baf1c0c8d546668c9300a59a7e70c74fb772'
      )
    )
  },
  floorTriggers: {
    groundFloor: new utils.TriggerBoxShape(
      new Vector3(32, 3, 32),
      Vector3.Zero()
    ),
    auctionRoom: new utils.TriggerBoxShape(
      new Vector3(29, 1.2, 32),
      new Vector3(-1, 0.4, 0)
    ),
    djRoom: new utils.TriggerBoxShape(
      new Vector3(25, 8.5, 28),
      new Vector3(0, 3.5, 0)
    )
  },
  nfts: {
    info: "Welcome to our erotic art NFT auction. If you want to place a bid, click the 'view on opensea' button.",
    sample:
      'https://opensea.io/assets/ethereum/0x06012c8cf97BEaD5deAe237070F9587f8E7A266d/558536',
    theFireWithin:
      'https://looksrare.org/collections/0x0A1F4C550cD7Bc37Af841e81fCf3557269f4E912/6000015',
    why: 'https://looksrare.org/collections/0x0A1F4C550cD7Bc37Af841e81fCf3557269f4E912/6000016',
    untitled:
      'https://looksrare.org/collections/0x0A1F4C550cD7Bc37Af841e81fCf3557269f4E912/6000017',
    libidinousNo3:
      'https://opensea.io/assets/ethereum/0x2cd36ae097211fbca1c7b18d2a7ff9cb64bdcf5b/1',
    lovehoney:
      'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/115677836832481261245646115252723515004461975438214618500946153243782533873665',
    bitterSweet:
      'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/88967829469239422276564335291641144032001366726132483733909662807721037004801',
    vulva73:
      'https://solsea.io/nft/B4ZrTKB3raL3hVva2YrvYGTHdrZj9NMns7LL9paBFejU',
    knots:
      'https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/114991564651645584537239623618574505434648752487468511599916701540116619853825',
    female:
      'https://opensea.io/assets/ethereum/0x495f947276749ce646f68ac8c248420045cb7b5e/3790466225756790825261527088614869379918570849702648613233645803826495619073'
  },
  administrators: {
    jade: '0x3275a2b4b48bae4518bfee7e8f2377128c3f2bf3',
    yoolee: '0xfe94794638133c8df92a3e16deb68a4b157d3901',
    fabian: '0x58d9de9e665178d9d5ffe6f5fc6ebb1ec19e53d5',
    philipp: '0xe5c62ead0a6ee376a60c89913f649184e4f4c2f7',
    phoebe: '0x2596c96df03bd167035117ad5df23795ca94ee4e',
    bryony: '0x241ae02a6be8247f8ad94e03f52ee694109722a9',
    colleen: '0x6ff7e8bd70093702bd9aeac0684b6d7748bef82b',
    calum: '0xf0fd2283ccb2c649af2b0b657baf2ace1cbe1b0c',
    natasha: '0x429a0156bde48df0109cee74ba0a92ba1d72edf1'
  },
  canvas: new UICanvas(),
  sceneMessageBus: new MessageBus(),
  input: Input.instance
}
