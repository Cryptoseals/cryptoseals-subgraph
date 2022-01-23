import {Transfer} from "../generated/WGold/WrappedCurrency";
import {getAccount} from "./utils/getAccount";
import {getStats} from "./utils/getStats";
import {STATS_ID} from "./utils/constants";
import {Address} from "@graphprotocol/graph-ts";

export function handleWMaterialTransfer(event: Transfer): void {
    const fromAddress = getAccount(event.params.from.toHexString());
    const toAddress = getAccount(event.params.to.toHexString());

    // mint
    if (event.params.from.equals(Address.zero())) {
        toAddress.wMaterialBalance = toAddress.wMaterialBalance.plus(event.params.amount);
        toAddress.save();

        const stats = getStats(STATS_ID);
        stats.wMaterialSupply = stats.wMaterialSupply.plus(event.params.amount);
        stats.save()

        // then burn
    } else if(event.params.to.equals(Address.zero())) {
        fromAddress.wMaterialBalance = fromAddress.wMaterialBalance.minus(event.params.amount);
        fromAddress.save();

        const stats = getStats(STATS_ID);
        stats.wMaterialSupply = stats.wMaterialSupply.minus(event.params.amount);
        stats.save()

        // then transfer
    } else {
        fromAddress.wMaterialBalance = fromAddress.wMaterialBalance.minus(event.params.amount);
        fromAddress.save();


        toAddress.wMaterialBalance = toAddress.wMaterialBalance.plus(event.params.amount);
        toAddress.save();

    }

}