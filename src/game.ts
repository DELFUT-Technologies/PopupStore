import { BuildingBlocker } from './resources'
import { createDispenser } from './booth/dispenser'
import { InitBouncer } from './npc/initBouncer'
import { InitNFTAuction } from './building/nftAuctionRoom'
import { InitQuest } from './quest/initQuest'
import { InitAdminPrivileges, CheckBlockedUsers } from './adminPrivileges'
import { DobUI } from './dob/ui'
import { InitScreens } from './building/screen'
import { InitBuilding, InitSMLinks } from './building/building'
import { InitElevator } from './building/elevator'
import { InitShop } from './building/initShop'
import { InitDJ } from './npc/initDJ'
import { InitWarp2 } from './building/warp'
import { InitMusicFloor } from './building/musicFloor'
import { InitSpeech } from './initSpeech'

// == Init admin privileges == //
void InitAdminPrivileges()
//void CheckBlockedUsers() /* if you uncomment this, don't forget to uncomment DB kick message bus */

// == Instantiate building == //
InitBuilding()
InitSMLinks()
InitElevator()

//  =============== DOBUI======================= //
DobUI.unhide()
engine.addEntity(BuildingBlocker)

InitBouncer()
InitDJ()
InitNFTAuction()
InitQuest()
createDispenser(
  {
    position: new Vector3(20.3, 12.8, 19.5),
    scale: new Vector3(0.8, 1, 0.8)
  },
  '505cf6de-68d8-4007-87bd-f685f79f9150'
)
InitScreens()
InitShop()
InitWarp2()
InitMusicFloor()
void InitSpeech()
