import {
    Attack,
    BossCreated,
    BossReqUpdated, BossRewUpdated, BossUpdated, LastHit
} from "../generated/CryptoSealsSummonersWorldBoss/CryptoSealsSummonersWorldBoss";
import {getBoss} from "./utils/getBoss";
import {getAttributes} from "./utils/getAttributes";
import {getSummoner} from "./utils/getSummoner";
import {BigInt, log} from "@graphprotocol/graph-ts";


export function handleAttack(event: Attack): void {
    const boss = getBoss(event.params._boss_id.toString());
    boss._boss_current_health = boss._boss_current_health.minus(event.params._damage);
    boss.save()

    const summoner = getSummoner(event.params._summoner.toString());
    summoner.bossDamage = summoner.bossDamage.plus(event.params._damage);
    summoner.xp = summoner.xp.plus(event.params._damage.times(BigInt.fromString(boss._xp_reward_per_hp)));
    summoner.save()
}

export function handleLastHit(event: LastHit): void {
    const summoner = getSummoner(event.params.killer.toString());
    summoner.bossKills = summoner.bossKills.plus(BigInt.fromString("1"));
    summoner.save()

    const boss = getBoss(event.params.boss_id.toString());
    boss.killedBy = event.params.killer;
    boss.save()
}

export function handleBossCreated(event: BossCreated): void {
    const attributesId = "Boss_".concat(event.params.id.toString())
    const attributes = getAttributes(attributesId);
    attributes.STR = event.params.requirement.minAttrs.STR;
    attributes.DEX = event.params.requirement.minAttrs.DEX;
    attributes.CON = event.params.requirement.minAttrs.CON;
    attributes.INT = event.params.requirement.minAttrs.INT;
    attributes.WIS = event.params.requirement.minAttrs.WIS;
    attributes.CHA = event.params.requirement.minAttrs.CHA;
    attributes.save()
    const boss = getBoss(event.params.id.toString());
    // reqs first.
    boss.minLevel = event.params.requirement.minLevel;
    boss.minAttrs = attributes.id;
    boss.requiredSkill = event.params.requirement.requiredSkill;
    boss.requiredSkillLevel = event.params.requirement.requiredSkillLevel;
    boss.requiredPet = event.params.requirement.requiredPet;
    boss.requiredItemContract = event.params.requirement.requiredItemContract;
    boss.requiredItemType = event.params.requirement.requiredItemType;
    boss.requiredItem = event.params.requirement.requiredItem;
    // boss props
    boss._active = event.params.boss._active
    boss._attack_cooldown = event.params.boss._attack_cooldown
    boss._boss_armor_class = event.params.boss._boss_armor_class
    boss._boss_current_health = event.params.boss._boss_current_health
    boss._boss_deadline = event.params.boss._boss_deadline
    boss._boss_max_health = event.params.boss._boss_max_health
    // rewards props
    boss._reward_token = event.params.reward._reward_token.toHexString();
    boss._token_reward_per_hp = event.params.reward._token_reward_per_hp.toString()
    boss._xp_reward_per_hp = event.params.reward._xp_reward_per_hp.toString()
    boss._name = event.params.boss._name;
    boss.save()
    log.info("boss created. rewards: {}, {}, {}", [boss._reward_token,
                                     boss._xp_reward_per_hp,
                                     boss._token_reward_per_hp
                                    ])
}

export function handleBossReqUpdated(event: BossReqUpdated): void {
    const attributesId = "Boss_".concat(event.params.id.toString())
    const attributes = getAttributes(attributesId);
    attributes.STR = event.params.requirement.minAttrs.STR;
    attributes.DEX = event.params.requirement.minAttrs.DEX;
    attributes.CON = event.params.requirement.minAttrs.CON;
    attributes.INT = event.params.requirement.minAttrs.INT;
    attributes.WIS = event.params.requirement.minAttrs.WIS;
    attributes.CHA = event.params.requirement.minAttrs.CHA;
    attributes.save()

    const boss = getBoss(event.params.id.toString());

    boss.minLevel = event.params.requirement.minLevel;
    boss.minAttrs = attributes.id;
    boss.requiredSkill = event.params.requirement.requiredSkill;
    boss.requiredSkillLevel = event.params.requirement.requiredSkillLevel;
    boss.requiredPet = event.params.requirement.requiredPet;
    boss.requiredItemContract = event.params.requirement.requiredItemContract;
    boss.requiredItemType = event.params.requirement.requiredItemType;
    boss.requiredItem = event.params.requirement.requiredItem;
    boss.save()
}

export function handleBossRewUpdated(event: BossRewUpdated): void {
    const boss = getBoss(event.params.id.toString());
    boss._reward_token = event.params.reward._reward_token.toHexString()
    boss._token_reward_per_hp = event.params.reward._token_reward_per_hp.toString()
    boss._xp_reward_per_hp = event.params.reward._xp_reward_per_hp.toString()
    boss.save()

}

export function handleBossUpdated(event: BossUpdated): void {
    const boss = getBoss(event.params.id.toString());
    boss._active = event.params.boss._active
    boss._attack_cooldown = event.params.boss._attack_cooldown
    boss._boss_armor_class = event.params.boss._boss_armor_class
    boss._boss_current_health = event.params.boss._boss_current_health
    boss._boss_deadline = event.params.boss._boss_deadline
    boss._boss_max_health = event.params.boss._boss_max_health
    boss.save()
}