import {
    Crafted,
    CryptoSealsCraftingCommon,
    Transfer
} from "../generated/CryptoSealsCraftingCommon/CryptoSealsCraftingCommon";
import {getCrafted} from "./utils/getCrafted";
import {Address, BigInt, store} from "@graphprotocol/graph-ts";
import {CraftedCommonItem} from "../generated/schema";
import {Contracts} from "./utils/constants";
import {getSummoner} from "./utils/getSummoner";
import {fireActivity} from "./utils/fireActivity";

export function handleTransfer(event: Transfer): void {
    const item = getCrafted(event.params.tokenId.toString());
    if (event.params.from.equals(Address.zero())) {
        const contract = CryptoSealsCraftingCommon.bind(Address.fromString(Contracts.CraftingCommon));
        const itemDataCall = contract.try_items(event.params.tokenId);
        if (!itemDataCall.reverted) {
            item.owner = event.params.to;
            item.creationDate = event.block.timestamp;
            item.base_type = BigInt.fromI32(itemDataCall.value.value0);
            item.item_type = BigInt.fromI32(itemDataCall.value.value1);
            item.creator = itemDataCall.value.value3;
        }
    } else if (event.params.to.equals(Address.zero())) {
        store.remove("CraftedCommonItem", event.params.tokenId.toString());
    } else {
        item.owner = event.params.to;
    }

    item.save()
}

export function handleCrafted(event: Crafted): void {
    const summoner = getSummoner(event.params.summoner.toString());
    summoner.craftedMaterialsUsed = summoner.craftedMaterialsUsed.plus(event.params.craft_i);
    summoner.craftedItems = summoner.craftedItems.plus(BigInt.fromString("1"))
    summoner.save()
    fireActivity(event.transaction.hash.toHexString(), "Craft", event.params.tokenId, event.params.summoner, event.block.timestamp);
}