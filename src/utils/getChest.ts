import {Chest} from "../../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts/index";

export function getChest(id: string) : Chest {
    let item = Chest.load(id);
    if(!item) {
        item = new Chest(id);
        item.owner = Address.zero();
        item.chestType = BigInt.fromString("0");
        item.opened = false;
    }

    return item as Chest
}