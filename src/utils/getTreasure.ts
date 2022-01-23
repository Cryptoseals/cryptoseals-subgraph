import {Treasure} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export const getTreasure = (id: string): Treasure => {
    let treasure = Treasure.load(id);
    if(!treasure) {
        treasure = new Treasure(id);
        treasure.equippedBy = BigInt.fromString("99999999999999999999");
    }
    return treasure as Treasure;
}