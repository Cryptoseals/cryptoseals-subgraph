import {GuildTreasury} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export function getGuildTreasury(id: string): GuildTreasury {
    let treasury = GuildTreasury.load(id);
    if (!treasury) {
        treasury = new GuildTreasury(id)
        treasury.essenceBalance = BigInt.fromString("0")
        treasury.goldBalance = BigInt.fromString("0")
        treasury.materialBalance = BigInt.fromString("0")
    }
    return treasury as GuildTreasury
}