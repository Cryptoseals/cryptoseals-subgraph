import {Created, Leveled, Reset} from "../generated/CryptoSealsSummonerAttributes/CryptoSealsSummonerAttributes";
import {getSummoner} from "./utils/getSummoner";
import {getAttributes} from "./utils/getAttributes";
import {BigInt} from "@graphprotocol/graph-ts";
import {fireActivity} from "./utils/fireActivity";

export function handleCreated(event: Created) : void {
    const summoner = getSummoner(event.params.summoner.toString());
    const attributes = getAttributes(event.params.summoner.toString());
    attributes.STR = event.params.strength;
    attributes.DEX = event.params.dexterity;
    attributes.CON = event.params.constitution;
    attributes.INT = event.params.intelligence;
    attributes.WIS = event.params.wisdom;
    attributes.CHA = event.params.charisma;
    summoner.attributes = attributes.id;
    attributes.save();
    summoner.save();
    fireActivity(event.transaction.hash.toHexString(),"AttributeCreate",BigInt.fromI32(0), event.params.summoner, event.block.timestamp);

}
export function handleLeveled(event: Leveled) : void {
    const attributes = getAttributes(event.params.summoner.toString());
    attributes.STR = event.params.strength;
    attributes.DEX = event.params.dexterity;
    attributes.CON = event.params.constitution;
    attributes.INT = event.params.intelligence;
    attributes.WIS = event.params.wisdom;
    attributes.CHA = event.params.charisma;
    attributes.save();

    const summoner = getSummoner(event.params.summoner.toString())
    summoner.spentPoints = summoner.spentPoints.plus(BigInt.fromString("1"));
    summoner.save()
    fireActivity(event.transaction.hash.toHexString(),"AttributeLevel",BigInt.fromI32(0), event.params.summoner, event.block.timestamp);
}

export function handleReset(event: Reset) : void {
    const summoner = getSummoner(event.params.summoner.toString());
    summoner.spentPoints = BigInt.fromString("0");
    summoner.save()

    const attributes = getAttributes(event.params.summoner.toString());
    attributes.STR = BigInt.fromString("0");
    attributes.DEX = BigInt.fromString("0");
    attributes.CON = BigInt.fromString("0");
    attributes.INT = BigInt.fromString("0");
    attributes.WIS = BigInt.fromString("0");
    attributes.CHA = BigInt.fromString("0");
    attributes.save();

    fireActivity(event.transaction.hash.toHexString(),"AttributeReset",BigInt.fromI32(0), event.params.summoner, event.block.timestamp);
}