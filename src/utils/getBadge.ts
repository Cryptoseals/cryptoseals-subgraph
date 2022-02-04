import {Badge} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts/index";

export function getBadge(id:string) : Badge {
    let badge = Badge.load(id);
    if(!badge){
        badge = new Badge(id);
        badge.bossId = BigInt.fromString("0")
        badge.killer = BigInt.fromString("0")
    }
    return  badge as Badge;
}
