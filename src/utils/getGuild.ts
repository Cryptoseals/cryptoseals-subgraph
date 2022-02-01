import {Guild} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export function getGuild(id: string): Guild {
    let guild = Guild.load(id);
    if (!guild) {
        guild = new Guild(id)
        guild.name = ""
        guild.fame = BigInt.fromString("0")
        guild.leader = null
        guild.ipfs = ""
        guild.level = BigInt.fromString("1")
        guild.admins = new Array<BigInt>(0);
        guild.mods = new Array<BigInt>(0);
        guild.memberCount = BigInt.fromString("0")
        guild.essenceBalance = BigInt.fromString("0")
        guild.goldBalance = BigInt.fromString("0")
        guild.materialBalance = BigInt.fromString("0")
        guild.members = new Array<string>(0);
    }

    return guild as Guild
}