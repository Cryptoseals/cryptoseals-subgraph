import {Summoner} from '../../generated/schema'
import {getClass} from "./getSummonerClass";
import {BigInt} from "@graphprotocol/graph-ts/index";
import {Address} from "@graphprotocol/graph-ts";


export function getSummoner(id: string): Summoner {
    let summoner = Summoner.load(id)
    if (!summoner) {
        summoner = new Summoner(id);
        summoner.owner = Address.fromString("0x0000000000000000000000000000000000000000");
        summoner.class_id = BigInt.fromString("0");
        summoner.class_ = getClass("0");
        summoner.xp = BigInt.fromString("0");
        summoner.log = BigInt.fromString("0");
        summoner.level = BigInt.fromString("1");
        summoner.spentPoints = BigInt.fromString("0");
        summoner.essenceBalance = BigInt.fromString("0");
        summoner.goldBalance = BigInt.fromString("0");
        summoner.craftingMaterialBalance = BigInt.fromString("0");
        summoner.bossKills = BigInt.fromString("0")
        summoner.craftedMaterialsUsed = BigInt.fromString("0")
        summoner.craftedItems = BigInt.fromString("0")
        summoner.guild = "0"
    }
    return summoner as Summoner;
}
