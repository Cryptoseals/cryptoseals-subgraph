import {Burn, Transfer} from "../generated/Essence/UnwrappedCurrency";
import {getSummoner} from "./utils/getSummoner";
import {getStats} from "./utils/getStats";
import {STATS_ID} from "./utils/constants";


export function handleEssenceTransfer(event: Transfer): void {
    const fromSummoner = getSummoner(event.params.from.toString());

    // mint
    if (event.params.from.equals(event.params.to)) {
        fromSummoner.essenceBalance = fromSummoner.essenceBalance.plus(event.params.amount);

        const stats = getStats(STATS_ID);
        stats.essenceSupply = stats.essenceSupply.plus(event.params.amount);
        stats.save()

        // then transfer
    } else {
        fromSummoner.essenceBalance = fromSummoner.essenceBalance.minus(event.params.amount);
        const toSummoner = getSummoner(event.params.to.toString());
        toSummoner.essenceBalance = toSummoner.essenceBalance.plus(event.params.amount);
        toSummoner.save()
    }
    fromSummoner.save()
}

export function handleEssenceBurn(event: Burn): void {
    const fromSummoner = getSummoner(event.params.from.toString());
    fromSummoner.essenceBalance = fromSummoner.essenceBalance.minus(event.params.amount);
    fromSummoner.save()

    const stats = getStats(STATS_ID);
    stats.essenceSupply = stats.essenceSupply.minus(event.params.amount);
    stats.save()
}