import {Attributes, Boss} from "../../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {getAttributes} from "./getAttributes";

export function getBoss(id:string): Boss {
    let boss = Boss.load(id)

    if(!boss){
        boss = new Boss(id);
        boss._name = "";
        boss._active = false;
        boss._attack_cooldown = BigInt.fromString("0")
        boss._boss_armor_class = BigInt.fromString("0")
        boss._boss_current_health = BigInt.fromString("0")
        boss._boss_max_health = BigInt.fromString("0")
        boss._boss_deadline = BigInt.fromString("0")
        boss.requiredItem = BigInt.fromString("0")
        boss.requiredItemType = BigInt.fromString("0")
        boss.requiredItemContract = Address.zero()
        boss.requiredPet = Address.zero()
        boss.requiredSkill = BigInt.fromString("0")
        boss.requiredSkillLevel = BigInt.fromString("0")
        boss._reward_token = Address.zero().toHexString()
        boss._token_reward_per_hp = "0"
        boss._xp_reward_per_hp = "0"
        boss.minAttrs = getAttributes("Boss".concat('_').concat(id)).id;
        boss.minLevel = BigInt.fromString("0")
    }

    return boss as Boss
}