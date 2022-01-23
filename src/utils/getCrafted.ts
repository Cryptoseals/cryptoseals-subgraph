import {CraftedCommonItem} from "../../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";

export function getCrafted(id:string): CraftedCommonItem {
    let item = CraftedCommonItem.load(id);
    if(!item) {
        item = new CraftedCommonItem(id);
        item.base_type = BigInt.fromString("0")
        item.item_type = BigInt.fromString("0")
        item.creator = BigInt.fromString("0");
        item.creationDate = BigInt.fromString("0")
        item.owner = Address.zero();
    }

    return item as CraftedCommonItem
}