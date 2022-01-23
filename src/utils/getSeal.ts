import {Seal} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export const getSeal = (id: string): Seal => {
    let seal = Seal.load(id);
    if(!seal) {
        seal = new Seal(id);
        seal.equippedBy = BigInt.fromString("99999999999999999999");
    }
    return seal as Seal;
}