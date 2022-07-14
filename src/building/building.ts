import resources, { ClickerPlane, Parent, QuestAnimation } from '../resources'
import * as utils from '@dcl/ecs-scene-utils'

export function InitBuilding() {
  const PopUpStore = new Entity()
  PopUpStore.setParent(Parent)
  PopUpStore.addComponent(
    new Transform({
      position: new Vector3(0.27, -0.22, -0.02),
      //position: new Vector3(0.27, -8.5, -0.02),
      rotation: Quaternion.Euler(0, 180, 0)
    })
  )
  PopUpStore.addComponent(resources.models.popUpStore)
  engine.addEntity(PopUpStore)

  // ====== DJ Room 4th Floor Animations ======= //
  const DJRoomAnimator = new Animator()
  PopUpStore.addComponent(DJRoomAnimator)

  const DJRoomLights = new AnimationState('[保留アクション]', {
    looping: true,
    layer: 0
  })
  DJRoomAnimator.addClip(DJRoomLights)
  DJRoomLights.play()

  // poap animation
  const poapAnimation = new AnimationState('Rotation', {
    looping: true,
    layer: 1
  })
  DJRoomAnimator.addClip(poapAnimation)
  poapAnimation.play()
  // Quest animation
  DJRoomAnimator.addClip(QuestAnimation)
  QuestAnimation.play()

  // ====== music with light model ======= //
  // juno1
  const music_object = new Entity()
  music_object.addComponent(resources.models.juno1)
  music_object.addComponent(
    new Transform({
      position: new Vector3(18.5, 13.1, 20.5)
      //position: new Vector3(0, 0, 0)
    })
  )
  const music_animator = new Animator()
  music_object.addComponent(music_animator)

  const rotation = new AnimationState('[保留アクション]', {
    looping: true,
    layer: 0,
    speed: 1
  })
  music_animator.addClip(rotation)
  //aca.play()

  const triggerShape3 = new utils.TriggerBoxShape(
    new Vector3(25, 8.5, 28),
    new Vector3(1.5, 3.7, 1.5)
  )
  music_object.addComponent(
    new utils.TriggerComponent(triggerShape3, {
      onCameraEnter: () => {
        rotation.play()
      },
      onCameraExit: () => {
        rotation.stop()
      }
    })
  )
  engine.addEntity(music_object)
  music_object.setParent(Parent)

  // juno2
  const music_object2 = new Entity()
  music_object2.addComponent(resources.models.juno2)
  music_object2.addComponent(
    new Transform({
      position: new Vector3(11.5, 13.1, 17),
      rotation: Quaternion.Euler(0, -60, 0)
    })
  )
  const music_animator2 = new Animator()
  music_object2.addComponent(music_animator2)

  const rotation2 = new AnimationState('[保留アクション]', {
    looping: true,
    layer: 0,
    speed: 1
  })
  music_animator2.addClip(rotation2)
  //aca.play()

  const triggerShape4 = new utils.TriggerBoxShape(
    new Vector3(25, 8.5, 28),
    new Vector3(-5.5, 3.7, -2)
  )
  music_object2.addComponent(
    new utils.TriggerComponent(triggerShape4, {
      onCameraEnter: () => {
        rotation2.play()
      },
      onCameraExit: () => {
        rotation2.stop()
      }
    })
  )
  engine.addEntity(music_object2)
  music_object2.setParent(Parent)

  // juno3
  const music_object3 = new Entity()
  music_object3.addComponent(resources.models.juno3)
  music_object3.addComponent(
    new Transform({
      position: new Vector3(11.5, 13.1, 13),
      rotation: Quaternion.Euler(0, 90, 0)
    })
  )
  const music_animator3 = new Animator()
  music_object3.addComponent(music_animator3)

  const rotation3 = new AnimationState('[保留アクション]', {
    looping: true,
    layer: 0,
    speed: 1
  })
  music_animator3.addClip(rotation3)
  //aca.play()

  const triggerShape5 = new utils.TriggerBoxShape(
    new Vector3(25, 8.5, 28),
    new Vector3(-5.5, 3.7, -6)
  )
  music_object3.addComponent(
    new utils.TriggerComponent(triggerShape5, {
      onCameraEnter: () => {
        rotation3.play()
      },
      onCameraExit: () => {
        rotation3.stop()
      }
    })
  )
  engine.addEntity(music_object3)
  music_object3.setParent(Parent)

  // juno4
  /*const music_object4 = new Entity()
  music_object4.addComponent(resources.models.juno4)
  music_object4.addComponent(
    new Transform({
      position: new Vector3(14, 13.1, 9.5),
      rotation: Quaternion.Euler(0, 60, 0)
    })
  )
  const music_animator4 = new Animator()
  music_object4.addComponent(music_animator4)

  const rotation4 = new AnimationState('[保留アクション]', {
    looping: true,
    layer: 0,
    speed: 1
  })
  music_animator4.addClip(rotation4)
  //aca.play()

  const triggerShape6 = new utils.TriggerBoxShape(
    new Vector3(25, 8.5, 28),
    new Vector3(-8, 3.7, -2.5)
  )
  music_object4.addComponent(
    new utils.TriggerComponent(triggerShape6, {
      onCameraEnter: () => {
        rotation4.play()
      },
      onCameraExit: () => {
        rotation4.stop()
      }
    })
  )
  engine.addEntity(music_object4)
  music_object4.setParent(Parent)*/
}

export function InitSMLinks() {
  const smModel = new Entity()
  smModel.addComponent(resources.models.sm)
  smModel.addComponent(
    new Transform({
      position: new Vector3(29, 1, 30)
    })
  )
  smModel.setParent(Parent)
  engine.addEntity(smModel)

  // ====== IG link ======= //
  const instagramLink = new Entity()
  instagramLink.addComponent(ClickerPlane)
  instagramLink.addComponent(
    new Transform({
      position: new Vector3(29, 1.3, 30),
      scale: new Vector3(0.6, 0.6, 0.6)
    })
  )
  instagramLink.addComponent(
    new OnPointerDown(
      () => {
        openExternalURL('https://www.instagram.com/lovehoneyofficial/')
      },
      {
        hoverText: 'Go to instagram'
      }
    )
  )
  instagramLink.setParent(Parent)
  engine.addEntity(instagramLink)

  // ====== twitter link model ======= //
  const twitterLink = new Entity()
  twitterLink.addComponent(ClickerPlane)
  twitterLink.addComponent(
    new Transform({
      position: new Vector3(28, 1.3, 30),
      scale: new Vector3(0.6, 0.6, 0.6)
    })
  )
  twitterLink.addComponent(
    new OnPointerDown(
      () => {
        openExternalURL('https://twitter.com/lovehoney/')
      },
      {
        hoverText: 'Go to Twitter'
      }
    )
  )
  twitterLink.setParent(Parent)
  engine.addEntity(twitterLink)

  // ====== TikTok link model ======= //
  const TikTokLink = new Entity()
  TikTokLink.addComponent(ClickerPlane)
  TikTokLink.addComponent(
    new Transform({
      position: new Vector3(27, 1.3, 30),
      scale: new Vector3(0.6, 0.6, 0.6)
    })
  )
  TikTokLink.addComponent(
    new OnPointerDown(
      () => {
        openExternalURL('https://www.tiktok.com/@lovehoneyglobal')
      },
      {
        hoverText: 'Go to TikTok'
      }
    )
  )
  TikTokLink.setParent(Parent)
  engine.addEntity(TikTokLink)
}
