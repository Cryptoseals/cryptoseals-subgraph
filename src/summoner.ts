import {Address, BigInt, Bytes, log} from "@graphprotocol/graph-ts";
import {
    BoostedRitual, CryptoSealsSummoners, EquipPet, EquipSeal, EquipTreasure,
    LevelUp, NameSummoner,
    Ritual,
    Summoner,
    Transfer
} from "../generated/CryptoSealsSummoners/CryptoSealsSummoners";
import {getSummoner} from "./utils/getSummoner";
import {getClass} from "./utils/getSummonerClass";
import {fireActivity} from "./utils/fireActivity";
import {Contracts} from "./utils/constants";
import {getTreasure} from "./utils/getTreasure";
import {getSeal} from "./utils/getSeal";
import {getPet} from "./utils/getPet";
import {CryptoSealsAvatar} from "../generated/CryptoSealsSummoners/CryptoSealsAvatar";
import {getName} from "./utils/getName";

export function handleSummoner(event: Summoner): void {
    const summoner = getSummoner(event.params.summoner.toString());
    summoner.owner = event.params.owner;
    summoner.class_id = event.params._class;
    summoner.class_ = getClass(event.params._class.toString());
    summoner.xp = BigInt.fromString("0");
    summoner.log = BigInt.fromString("0");
    summoner.level = BigInt.fromString("1");
    summoner.spentPoints = BigInt.fromString("0");
    summoner.essenceBalance = BigInt.fromString("0");
    summoner.goldBalance = BigInt.fromString("0");
    summoner.craftingMaterialBalance = BigInt.fromString("0");

    const contract = CryptoSealsSummoners.bind(Address.fromString(Contracts.Summoners));
    const request = contract.try_genders(event.params.summoner)
    if (!request.reverted){
        summoner.gender = request.value.equals(BigInt.fromString("0")) ? "Male" : "Female";
    }

    const avatar = CryptoSealsAvatar.bind(Address.fromString(Contracts.Avatar));
    const hash = avatar.try_getHash(event.params.summoner);
    if (!hash.reverted) {
        summoner.hash = hash.value;
    }


    summoner.save()


    fireActivity(event.transaction.hash.toHexString(), "Summon",
        event.params.summoner, event.params._class, event.block.timestamp);
}

export function handleTransfer(event: Transfer): void {
    const summoner = getSummoner(event.params.tokenId.toString());
    summoner.owner = event.params.to as Bytes;
    summoner.save()
}
export function handleNameSummoner(event: NameSummoner): void {
    const summoner = getSummoner(event.params.summoner.toString());
    summoner.name = event.params.name;
    summoner.save()
    const oldName = getName(event.params.oldName);
    oldName.ownedBy = null;
    oldName.save()
    const newName = getName(event.params.name);
    newName.ownedBy = event.params.summoner;
    newName.save()
}

export function handleRitual(event: Ritual): void {
    let summoner = getSummoner(event.params.summoner.toString());
    if (summoner.xp) {
        summoner.xp = summoner.xp.plus(event.params.exp);
    }
    summoner.save()

    fireActivity(event.transaction.hash.toHexString(), "Ritual",
        event.params.summoner, event.params.exp, event.block.timestamp);
}

export function handleBoostedRitual(event: BoostedRitual): void {
    let summoner = getSummoner(event.params.summoner.toString());
    if (summoner.xp) {
        summoner.xp = summoner.xp.plus(event.params.exp);
    }
    summoner.save()

    fireActivity(event.transaction.hash.toHexString(), "BoostedRitual",
        event.params.exp, event.params.summoner, event.block.timestamp);
}

export function handleLevelUp(event: LevelUp): void {
    let summoner = getSummoner(event.params.summoner.toString());
    if (summoner.xp) {
        const contract = CryptoSealsSummoners.bind(Address.fromString(Contracts.Summoners));
        const currentXp = contract.try_xp(event.params.summoner);
        if(!currentXp.reverted){
            summoner.xp = currentXp.value;
        }
    }
    summoner.level = event.params.level;
    summoner.save()


    fireActivity(event.transaction.hash.toHexString(), "LevelUp",
        event.params.summoner, event.params.level, event.block.timestamp);
}


export function handlePet(event: EquipPet): void {
    const summoner = getSummoner(event.params.summoner.toString());
    const contract = CryptoSealsSummoners.bind(Address.fromString(Contracts.Summoners))
    const tryCall = contract.try_getEquipped(event.params.summoner);

    if (!tryCall.reverted) {
        summoner.equippedPet = tryCall.value.equippedPet;
        summoner.equippedPetAddress = tryCall.value.equippedPetAddress;
        summoner.isPetEquipped = tryCall.value.isPetEquipped;
    } else {
        log.critical(' handlePet getEquipped call error {}', [event.params.summoner.toString()])
    }

    summoner.save()


    const pet = getPet(event.params._contract.toHexString().concat('_').concat(event.params.token.toString()));
    pet.equippedBy = event.params.summoner;
    pet.save()
}


export function handleSeal(event: EquipSeal): void {
    const summoner = getSummoner(event.params.summoner.toString());
    const contract = CryptoSealsSummoners.bind(Address.fromString(Contracts.Summoners))
    const tryCall = contract.try_getEquipped(event.params.summoner);

    if (!tryCall.reverted) {
        summoner.equippedSeal = tryCall.value.equippedSeal;
        summoner.isSealEquiped = tryCall.value.isSealEquiped;
    } else {
        log.critical('handleSeal Summoner getEquipped call error {}', [event.params.summoner.toString()])
    }

    summoner.save()

    const seal = getSeal(event.params.token.toString());
    seal.equippedBy = event.params.summoner;
    seal.save()
}

export function handleTreasure(event: EquipTreasure): void {
    const summoner = getSummoner(event.params.summoner.toString());
    const contract = CryptoSealsSummoners.bind(Address.fromString(Contracts.Summoners))
    const tryCall = contract.try_getEquipped(event.params.summoner);

    if (!tryCall.reverted) {
        summoner.equippedTreasure = tryCall.value.equippedTreasure;
        summoner.isTreasureEquipped = tryCall.value.isTreasureEquipped;
    } else {
        log.critical(' handleTreasureSummoner getEquipped call error {}', [event.params.summoner.toString()])
    }

    summoner.save()

    const treasure = getTreasure(event.params.token.toString());
    treasure.equippedBy = event.params.summoner;
    treasure.save()
}
