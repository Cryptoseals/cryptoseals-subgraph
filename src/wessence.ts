import {Transfer} from "../generated/WEssence/WrappedCurrency";
import {getAccount} from "./utils/getAccount";
import {getStats} from "./utils/getStats";
import {STATS_ID} from "./utils/constants";
import {Address} from "@graphprotocol/graph-ts";

export function handleWEssenceTransfer(event: Transfer): void {
    const fromAddress = getAccount(event.params.from.toHexString());
    const toAddress = getAccount(event.params.to.toHexString());

    // mint
    if (event.params.from.equals(Address.zero())) {
        toAddress.wEssenceBalance = toAddress.wEssenceBalance.plus(event.params.amount);
        toAddress.save();

        const stats = getStats(STATS_ID);
        stats.wEssenceSupply = stats.wEssenceSupply.plus(event.params.amount);
        stats.save()

        // then burn
    } else if(event.params.to.equals(Address.zero())) {
        fromAddress.wEssenceBalance = fromAddress.wEssenceBalance.minus(event.params.amount);
        fromAddress.save();

        const stats = getStats(STATS_ID);
        stats.wEssenceSupply = stats.wEssenceSupply.minus(event.params.amount);
        stats.save()

        // then transfer
    } else {
        fromAddress.wEssenceBalance = fromAddress.wEssenceBalance.minus(event.params.amount);
        fromAddress.save();


        toAddress.wEssenceBalance = toAddress.wEssenceBalance.plus(event.params.amount);
        toAddress.save();

    }

}