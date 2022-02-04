import {
    Contribution,
    CryptoSealsGuilds,
    GuildAdminsUpdate, GuildCreated,
    GuildModsUpdate, GuildUpdated, GuildUpgraded, SummonerApplication, SummonerJoined, SummonerLeft,
} from "../generated/CryptoSealsGuilds/CryptoSealsGuilds";
import {getGuildTreasury} from "./utils/getGuildTreasury";
import {getGuild} from "./utils/getGuild";
import {Contracts} from "./utils/constants";
import {Address, BigInt, ipfs, json} from "@graphprotocol/graph-ts";
import {CryptoSealsGuildFame} from "../generated/CryptoSealsGuildFame/CryptoSealsGuildFame";
import {getGuildApplications} from "./utils/getGuildApplications";
import {getSummoner} from "./utils/getSummoner";
import {getContribution} from "./utils/getContribution";


export function handleContribution(event: Contribution): void {
    const treasure = getGuildTreasury(event.params.guild.toString());
    treasure.materialBalance = treasure.materialBalance.plus(event.params.material);
    treasure.goldBalance = treasure.goldBalance.plus(event.params.gold);
    treasure.essenceBalance = treasure.essenceBalance.plus(event.params.essence);
    treasure.save()

    const guild = getGuild(event.params.guild.toString())
    guild.materialBalance = guild.materialBalance.plus(event.params.material);
    guild.goldBalance = guild.goldBalance.plus(event.params.gold);
    guild.essenceBalance = guild.essenceBalance.plus(event.params.essence);
    guild.save()

    const contribution = getContribution(event.params.contributor.toString());
    contribution.guild = event.params.guild.toString();
    contribution.material = contribution.material.plus(event.params.material);
    contribution.gold = contribution.gold.plus(event.params.gold);
    contribution.essence = contribution.essence.plus(event.params.essence);
    contribution.save()
}

export function handleGuildAdminsUpdate(event: GuildAdminsUpdate): void {
    const guild = getGuild(event.params.id.toString());
    const contract = CryptoSealsGuilds.bind(Address.fromString(Contracts.Guilds))
    const admins = contract.try_guildAdmins(event.params.id);
    if (!admins.reverted) {
        const newArray = new Array<string>(admins.value.length);
        for (let i = 0; i < admins.value.length; i++) {
            newArray[i] = admins.value[i].toString();
        }
        guild.admins = newArray;
    }
    guild.save()
}

export function handleGuildModsUpdate(event: GuildModsUpdate): void {
    const guild = getGuild(event.params.id.toString());
    const contract = CryptoSealsGuilds.bind(Address.fromString(Contracts.Guilds))
    const mods = contract.try_guildMods(event.params.id);
    if (!mods.reverted) {
        const newArray = new Array<string>(mods.value.length);
        for (let i = 0; i < mods.value.length; i++) {
            newArray[i] = mods.value[i].toString();
        }
        guild.mods = newArray;
    }
    guild.save()
}

export function handleGuildCreated(event: GuildCreated): void {
    const guild = getGuild(event.params.id.toString());
    guild.name = event.params.guild.name;
    guild.leader = event.params.guild.leader.toString();
    guild.ipfs = event.params.guild.ipfs;
    let ipfsHash = guild.ipfs.replace('ipfs://', "")
    let metadataResult = ipfs.cat(ipfsHash)
    if (metadataResult) {
        let value = json.fromBytes(metadataResult).toObject()
        if (value) {
            const kind = value.get('image')
            if (kind) {
                guild.image = kind.toString()
            }
            const description = value.get('description')
            if (description) {
                guild.description = description.toString()
            }
        }
    }
    const contract = CryptoSealsGuilds.bind(Address.fromString(Contracts.Guilds));
    const call = contract.try_guildMembers(event.params.id)
    if (!call.reverted) {
        const _newMemberArray = new Array<string>(call.value.length);
        for (let i = 0; i < call.value.length; i++) {
            _newMemberArray[i] = call.value[i].toString()
        }
        guild.members = _newMemberArray;
    }
    guild.save()
    const summoner = getSummoner(event.params.guild.leader.toString());
    summoner.guild = event.params.id.toString();
    summoner.save()
}

export function handleGuildUpgraded(event: GuildUpgraded): void {
    const guild = getGuild(event.params.id.toString());
    guild.name = event.params.guild.name;
    guild.leader = event.params.guild.leader.toString();
    guild.ipfs = event.params.guild.ipfs;
    guild.level = event.params.guild.level;

    guild.materialBalance = event.params.treasure.materialBalance;
    guild.goldBalance = event.params.treasure.goldBalance;
    guild.essenceBalance = event.params.treasure.essenceBalance;

    const treasure = getGuildTreasury(event.params.id.toString());
    treasure.materialBalance = event.params.treasure.materialBalance;
    treasure.goldBalance = event.params.treasure.goldBalance;
    treasure.essenceBalance = event.params.treasure.essenceBalance;
    treasure.save()

    const fameContract = CryptoSealsGuildFame.bind(Address.fromString(Contracts.Fame));
    const bal = fameContract.try_balanceOf(event.params.id);
    if (!bal.reverted) {
        guild.fame = bal.value;
    }
    guild.save()
}

export function handleGuildUpdated(event: GuildUpdated): void {
    const guild = getGuild(event.params.id.toString());
    guild.name = event.params.guild.name;
    guild.ipfs = event.params.guild.ipfs;
    let ipfsHash = guild.ipfs.replace('ipfs://', "")
    let metadataResult = ipfs.cat(ipfsHash)
    if (metadataResult) {
        let value = json.fromBytes(metadataResult).toObject()
        if (value) {
            const kind = value.get('image')
            if (kind) {
                guild.image = kind.toString()
            }
            const description = value.get('description')
            if (description) {
                guild.description = description.toString()
            }
        }
    }
    guild.save();
}

export function handleSummonerApplication(event: SummonerApplication): void {
    const applications = getGuildApplications(event.params.id.toString());

    const converted = new Array<string>(event.params.guild_ids.length)
    for (let i = 0; i < event.params.guild_ids.length; i++) {
        converted[i] = event.params.guild_ids[i].toString()
    }

    applications.appliedTo = event.params.guild_ids;
    applications.guilds = converted;
    applications.save()
}

export function handleSummonerJoined(event: SummonerJoined): void {
    const applications = getGuildApplications(event.params.id.toString());
    applications.appliedTo = new Array<BigInt>(0);
    applications.guilds = new Array<string>(0);
    applications.save()
    const summoner = getSummoner(event.params.id.toString())
    summoner.guild = event.params.guild_id.toString();
    summoner.save()
    const guild = getGuild(event.params.guild_id.toString())
    guild.memberCount = guild.memberCount.plus(BigInt.fromString("1"));

    const contract = CryptoSealsGuilds.bind(Address.fromString(Contracts.Guilds));
    const call = contract.try_guildMembers(event.params.guild_id)
    if (!call.reverted) {
        const _newMemberArray = new Array<string>(call.value.length);
        for (let i = 0; i < call.value.length; i++) {
            _newMemberArray[i] = call.value[i].toString()
        }
        guild.members = _newMemberArray;
    }

    guild.save()
}

export function handleSummonerKicked(event: SummonerJoined): void {
    const summoner = getSummoner(event.params.id.toString())
    summoner.guild = "0";
    summoner.save()
    const guild = getGuild(event.params.guild_id.toString())
    guild.memberCount = guild.memberCount.minus(BigInt.fromString("1"));
    guild.save()
    const contribution = getContribution(event.params.id.toString());
    contribution.guild = "0";
    contribution.material = BigInt.fromString("0")
    contribution.gold = BigInt.fromString("0")
    contribution.essence = BigInt.fromString("0")
    contribution.save()
}


export function handleSummonerLeft(event: SummonerLeft): void {
    const summoner = getSummoner(event.params.id.toString())
    summoner.guild = "0";
    summoner.save()
    const guild = getGuild(event.params.guild_id.toString())
    guild.memberCount = guild.memberCount.minus(BigInt.fromString("1"));
    guild.save()
}
