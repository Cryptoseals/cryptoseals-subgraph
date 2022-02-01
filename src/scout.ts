import {Transfer} from "../generated/CryptoSealsCraftingI/CryptoSealsCraftingI";
import {getSummoner} from "./utils/getSummoner";
import {getStats} from "./utils/getStats";
import {STATS_ID} from "./utils/constants";
import {fireActivity} from "./utils/fireActivity";
import {Burn} from "../generated/Gold/UnwrappedCurrency";


export function handleCraftingMaterialTransfer(event: Transfer): void {
    const fromSummoner = getSummoner(event.params.from.toString());

    // mint
    if (event.params.from.equals(event.params.to)) {
        fromSummoner.craftingMaterialBalance = fromSummoner.craftingMaterialBalance.plus(event.params.amount);

        const stats = getStats(STATS_ID);
        stats.craftingMaterialISupply = stats.craftingMaterialISupply.plus(event.params.amount);
        stats.save()

        fireActivity(event.transaction.hash.toHexString(), "Scout",
            event.params.amount, event.params.to, event.block.timestamp);

        // then transfer
    } else {
        fromSummoner.craftingMaterialBalance = fromSummoner.craftingMaterialBalance.minus(event.params.amount);
        const toSummoner = getSummoner(event.params.to.toString());
        toSummoner.craftingMaterialBalance = toSummoner.craftingMaterialBalance.plus(event.params.amount);
        toSummoner.save()

        fireActivity(event.transaction.hash.toHexString(), "TransferMaterial",
            event.params.from, event.params.to, event.block.timestamp);

    }
    fromSummoner.save()
}
export function handleCraftingMaterialBurn(event: Burn): void {
    const fromSummoner = getSummoner(event.params.from.toString());
    fromSummoner.craftingMaterialBalance = fromSummoner.craftingMaterialBalance.minus(event.params.amount);
    fromSummoner.save()
}