import {Burn, Transfer} from "../generated/Gold/UnwrappedCurrency";
import {getSummoner} from "./utils/getSummoner";
import {getStats} from "./utils/getStats";
import {STATS_ID} from "./utils/constants";


export function handleGoldTransfer(event: Transfer): void {
    const fromSummoner = getSummoner(event.params.from.toString());

    // mint
    if (event.params.from.equals(event.params.to)) {
        fromSummoner.goldBalance = fromSummoner.goldBalance.plus(event.params.amount);

        const stats = getStats(STATS_ID);
        stats.goldSupply = stats.goldSupply.plus(event.params.amount);
        stats.save()

        // then transfer
    } else {
        fromSummoner.goldBalance = fromSummoner.goldBalance.minus(event.params.amount);
        const toSummoner = getSummoner(event.params.to.toString());
        toSummoner.goldBalance = toSummoner.goldBalance.plus(event.params.amount);
        toSummoner.save()
    }
    fromSummoner.save()
}

export function handleGoldBurn(event: Burn): void {
    const fromSummoner = getSummoner(event.params.from.toString());
    fromSummoner.goldBalance = fromSummoner.goldBalance.minus(event.params.amount);
    fromSummoner.save()

    const stats = getStats(STATS_ID);
    stats.goldSupply = stats.goldSupply.minus(event.params.amount);
    stats.save()
}