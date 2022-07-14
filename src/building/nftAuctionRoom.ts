import resources, { ClickerBox, ClickerPlane, Parent } from '../resources'
import { PlayOpenSound } from '../booth/sounds'
import * as utils from '@dcl/ecs-scene-utils'

class NFT extends Entity {
  constructor(link: string, transform: Transform) {
    super()
    this.setParent(Parent)
    //this.addComponent(new NFTShape(address, { style: PictureFrameStyle.None }))
    this.addComponent(ClickerPlane)
    this.addComponent(transform)
    const pointerAction: OnPointerDown = new OnPointerDown(
      () => {
        PlayOpenSound()
        openExternalURL(link)
        //openNFTDialog(address, resources.nfts.info)
      },
      {
        hoverText: 'Bid'
      }
    )
    this.addComponent(
      new utils.TriggerComponent(resources.floorTriggers.auctionRoom, {
        onCameraEnter: () => {
          this.addComponent(pointerAction)
        },
        onCameraExit: () => {
          this.removeComponent(OnPointerDown)
        }
      })
    )
    engine.addEntity(this)
  }
}

export function InitNFTAuction(): void {
  // Artist Name R1
  new NFT(
    resources.nfts.why,
    new Transform({
      position: new Vector3(22.9, 9.7, 27.1),
      scale: new Vector3(1.1, 2, 1),
      rotation: Quaternion.Euler(0, 36, 0)
    })
  )
  // Artist Name R2
  new NFT(
    resources.nfts.untitled,
    new Transform({
      position: new Vector3(19.6, 9.83, 28.65),
      scale: new Vector3(1.2, 2, 1),
      rotation: Quaternion.Euler(0, 5, 0)
    })
  )
  // Artist Name R3
  new NFT(
    resources.nfts.female,
    new Transform({
      position: new Vector3(16.3, 9.95, 27.4),
      scale: new Vector3(1.68, 1.85, 1),
      rotation: Quaternion.Euler(0, 326, 0)
    })
  )
  // Artist Name R4
  new NFT(
    resources.nfts.vulva73,
    new Transform({
      position: new Vector3(13.3, 9.75, 18.24),
      scale: new Vector3(2, 1.8, 1),
      rotation: Quaternion.Euler(0, 321, 0)
    })
  )
  // Artist Name R5
  new NFT(
    resources.nfts.libidinousNo3,
    new Transform({
      position: new Vector3(10.85, 9.78, 16.3),
      scale: new Vector3(1.8, 1.6, 1),
      rotation: Quaternion.Euler(0, 118, 0)
    })
  )
  // Artist Name R6
  new NFT(
    resources.nfts.lovehoney,
    new Transform({
      position: new Vector3(10.1, 9.73, 13.8),
      scale: new Vector3(1.8, 1.8, 1),
      rotation: Quaternion.Euler(0, 87, 0)
    })
  )
  // Artist Name R7
  new NFT(
    resources.nfts.theFireWithin,
    new Transform({
      position: new Vector3(11.8, 9.78, 11.5),
      rotation: Quaternion.Euler(0, 42, 0),
      scale: new Vector3(2.3, 1.6, 1)
    })
  )
  // Artist Name R8
  new NFT(
    resources.nfts.knots,
    new Transform({
      position: new Vector3(14.77, 9.81, 10.3),
      rotation: Quaternion.Euler(0, 12, 0),
      scale: new Vector3(2, 1.6, 1)
    })
  )
  // Artist Name R9
  new NFT(
    resources.nfts.bitterSweet,
    new Transform({
      position: new Vector3(17.85, 9.68, 9.9),
      rotation: Quaternion.Euler(0, 2, 0),
      scale: new Vector3(1.7, 1.8, 1)
    })
  )
}
