import {Burn, Transfer} from "../generated/CryptoSealsGuildFame/CryptoSealsGuildFame";
import {getGuild} from "./utils/getGuild";


export function handleFameBurn(event: Burn): void {
    const guild = getGuild(event.params.from.toString());
    guild.fame = guild.fame.minus(event.params.amount);
    guild.save()
}

export function handleFameTransfer(event: Transfer): void {
    const guild = getGuild(event.params.to.toString());
    guild.fame = guild.fame.plus(event.params.amount);
    guild.save()
}