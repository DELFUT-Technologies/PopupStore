import { ClickerBox, Parent } from '../resources'

class shopItem extends Entity {
  constructor(
    transform: Transform,
    itemLink: string,
    shape: Shape = ClickerBox
  ) {
    super()

    this.setParent(Parent)

    this.addComponent(shape)
    //const material = new Material()
    //material.albedoColor = new Color4(0, 0, 0, 0)
    //this.addComponent(material)
    this.addComponent(transform)
    this.addComponent(
      new OnPointerDown(
        () => {
          openExternalURL(itemLink)
        },
        {
          hoverText: 'Shop'
        }
      )
    )
    engine.addEntity(this)
  }
}

// All items are from left to right
export function InitShop() {
  // Juno Butt Plug
  new shopItem(
    new Transform({
      position: new Vector3(22.1, 1.4, 22.1),
      scale: new Vector3(1.68, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 325, 90)
    }),
    'https://www.lovehoney.co.uk/sex-toys/butt-plugs/vibrating-butt-plugs/p/lovehoney-juno-rechargeable-music-activated-vibrating-butt-plug/a44395g80016.html'
  )
  initFirstDisplayLeft()
  // Knicker Vibrator
  new shopItem(
    new Transform({
      position: new Vector3(19.9, 1.5, 11),
      scale: new Vector3(1.68, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 80, 90)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/vibrating-knickers/p/lovehoney-juno-rechargeable-music-activated-knicker-vibrator/a44393g80014.html'
  )
  initLingerie()
  initWomanizerDisplayLeft()
  initWomanizerDispayRight()
  // Happy Rabbit
  new shopItem(
    new Transform({
      position: new Vector3(9.1, 1.28, 17.4),
      scale: new Vector3(1.68, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 359, 90)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/rabbit-vibrators/p/happy-rabbit-g-spot-rechargeable-rabbit-vibrator/a29418g71502.html'
  )
  initArcWaveDisplay()
  // Juno Love Ring
  new shopItem(
    new Transform({
      position: new Vector3(14.4, 1.2, 21.1),
      scale: new Vector3(1.5, 0.5, 1.3),
      rotation: Quaternion.Euler(0, 95, 90)
    }),
    'https://www.lovehoney.co.uk/sex-toys/cock-rings/vibrating-cock-rings/p/lovehoney-juno-rechargeable-music-activated-vibrating-love-ring/a44396g80017.html'
  )
}

function initFirstDisplayLeft() {
  // Desire luxury male vibrator
  new shopItem(
    new Transform({
      position: new Vector3(24.9, 1.5, 16.1),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 104, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/male-sex-toys/male-masturbators/p/desire-luxury-rechargeable-male-vibrator/a44559g80237.html'
  )
  // Lovehoney health penis pump and ring set
  new shopItem(
    new Transform({
      position: new Vector3(24.6, 1.5, 15),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 104, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/male-sex-toys/penis-pumps/p/lovehoney-health-penis-pump-and-ring-set/a45664g82240.html'
  )
  // Lovehoney health silicone dilation set
  new shopItem(
    new Transform({
      position: new Vector3(23.6, 1.5, 13),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 132.8, 0)
    }),
    'https://www.lovehoney.co.uk/lubes-essentials/better-sex-for-her/better-female-orgasms/p/lovehoney-health-silicone-dilator-set/a45666g82242.html'
  )
  // Lust Remove controle wearable couple's vibrator
  new shopItem(
    new Transform({
      position: new Vector3(23.1, 1.5, 12.4),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 132.8, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-vibrators/p/lovehoney-lust-remote-control-wearable-couples-vibrator/a46167g83051.html'
  )
  // Lovehoney happy rabbit cock ring
  new shopItem(
    new Transform({
      position: new Vector3(22.6, 1.5, 11.85),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 132.8, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/cock-rings/vibrating-cock-rings/p/happy-rabbit-rechargeable-rabbit-cock-ring/a45585g82113.html'
  )
}

function initLingerie() {
  const lingerieClickScale = new Vector3(0.38, 1.2, 0.1)
  const lingerieRotation = Quaternion.Euler(0, 33, 0)
  // Flora Ivory Embroidered Bra Set
  new shopItem(
    new Transform({
      position: new Vector3(17.89, 1.3, 11.95),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/bras-bra-sets/bra-sets/p/lovehoney-flora-ivory-embroidered-bra-set/a46597g83715.html'
  )
  // Parisienne Wine Lace Plunge Longline Bra Set
  new shopItem(
    new Transform({
      position: new Vector3(17.54, 1.3, 11.95),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/bras-bra-sets/longline-bras/p/lovehoney-parisienne-wine-lace-plunge-longline-bra-set/a39213g72201.html'
  )
  // Peek-a-Boo White Lace Bra and Crotchless G-String
  new shopItem(
    new Transform({
      position: new Vector3(17.18, 1.3, 11.95),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/bras-bra-sets/bra-sets/p/lovehoney-peek-a-boo-white-lace-bra-and-crotchless-g-string/a36261g83744.html'
  )
  // Tiger Lily Red Floral Lace Teddy
  new shopItem(
    new Transform({
      position: new Vector3(16.84, 1.3, 11.95),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/lingerie-sets/bodies-teddies/p/lovehoney-tiger-lily-red-floral-lace-teddy/a46336g83349.html'
  )
  // Peony Lilac Sheer Mesh and Lace Crotchless Teddy
  new shopItem(
    new Transform({
      position: new Vector3(16.5, 1.3, 11.95),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/lingerie-sets/bodies-teddies/p/lovehoney-peony-lilac-sheer-mesh-and-lace-crotchless-teddy/a45545g82052.html'
  )
  // Vintage Bliss Ivory Bra Set (3 Piece)
  new shopItem(
    new Transform({
      position: new Vector3(16.23, 1.3, 11.85),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/bras-bra-sets/bra-sets/p/lovehoney-vintage-bliss-ivory-bra-set-3-piece/a46802g84023.html'
  )
  // Late Night Liaison Blue Lace Babydoll Set
  new shopItem(
    new Transform({
      position: new Vector3(15.9, 1.3, 11.7),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/lingerie-sets/baby-dolls-chemises/p/lovehoney-late-night-liaison-blue-lace-babydoll-set/a39228g72054.html'
  )
  // Fierce Wet Look Zip-Around Peek-a-Boo Body
  new shopItem(
    new Transform({
      position: new Vector3(15.6, 1.3, 11.7),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.co.uk/sexy-lingerie/lingerie-sets/bodies-teddies/p/lovehoney-fierce-wet-look-zip-around-peek-a-boo-body/a41160g75013.html'
  )
  // Plus Size Moonlight Peekaboo Bra and Garter Panties Set
  new shopItem(
    new Transform({
      position: new Vector3(15.24, 1.3, 11.5),
      scale: lingerieClickScale,
      rotation: lingerieRotation
    }),
    'https://www.lovehoney.com/sexy-lingerie/sexy-plus-size-14/bras-and-bra-sets/p/lovehoney-plus-size-moonlight-peekaboo-bra-and-garter-panties-set/a37756g69959.html'
  )
}

function initWomanizerDisplayLeft() {
  // Womanizer A: liberty
  new shopItem(
    new Transform({
      position: new Vector3(13.6, 1.5, 10.9),
      scale: new Vector3(0.5, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 40, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-suction-vibrators/p/womanizer-liberty-by-lily-allen-rechargeable-clitoral-stimulator/a45357g81760.html'
  )
  // Womanizer B: premium two
  new shopItem(
    new Transform({
      position: new Vector3(13, 1.5, 11.4),
      scale: new Vector3(0.5, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 40, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-suction-vibrators/p/womanizer-premium-2-rechargeable-smart-silence-clitoral-suction-stimulator/a46996g84384.html'
  )
  // Womanizer C: premium eco
  new shopItem(
    new Transform({
      position: new Vector3(12.2, 1.5, 12),
      scale: new Vector3(0.5, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 40, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-suction-vibrators/p/womanizer-premium-eco-smart-silence-clitoral-stimulator/a46163g83047.html'
  )
}

function initWomanizerDispayRight() {
  // Womanizer A: Inside out
  new shopItem(
    new Transform({
      position: new Vector3(10.8, 1.5, 13.7),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 55, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-suction-vibrators/p/womanizer-x-lovehoney-insideout-rechargeable-g-spot-and-clitoral-stimulator/a39565g81525.html'
  )
  // Womanizer B: Red Duo
  new shopItem(
    new Transform({
      position: new Vector3(10.3, 1.5, 14.6),
      scale: new Vector3(0.6, 0.5, 0.99),
      rotation: Quaternion.Euler(0, 55, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/vibrators/clitoral-suction-vibrators/p/womanizer-red-duo-rechargeable-g-spot-and-clitoral-stimulator/a40897g74519.html'
  )
}

function initArcWaveDisplay() {
  // ArcWave A: Ion
  new shopItem(
    new Transform({
      position: new Vector3(10.5, 1.5, 20.5),
      scale: new Vector3(0.6, 0.5, 1.15),
      rotation: Quaternion.Euler(0, 152, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/male-sex-toys/male-masturbators/p/arcwave-ion-pleasure-air-smart-silence-male-masturbator/a45127g81269.html'
  )
  // ArcWave B: Voy
  new shopItem(
    new Transform({
      position: new Vector3(11.4, 1.5, 20.9),
      scale: new Vector3(0.6, 0.5, 1.15),
      rotation: Quaternion.Euler(0, 152, 0)
    }),
    'https://www.lovehoney.co.uk/sex-toys/male-sex-toys/male-masturbators/p/arcwave-voy-compact-adjustable-silicone-male-stroker/a47471g85023.html'
  )
}
