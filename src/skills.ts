import {SkillUpdate} from "../generated/CryptoSealsSkills/CryptoSealsSkills";
import {getSummoner} from "./utils/getSummoner";
import {BigInt} from "@graphprotocol/graph-ts";


export function handleSkillUpdate(event: SkillUpdate): void {
    const summoner = getSummoner(event.params._summoner.toString());
    let convertToBigInt = new Array<BigInt>(event.params.skills.length)
    for (let i = 0; i < event.params.skills.length; ++i) {
        convertToBigInt[i] = BigInt.fromI32(event.params.skills[i])
    }
    summoner.skills = convertToBigInt;
    summoner.save()
}