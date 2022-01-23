import {BigInt} from "@graphprotocol/graph-ts";
import {Name} from "../../generated/schema";

export function getName(id: string): Name {
    let name = Name.load(id);
    if (!name) {
        name = new Name(id);
        name.ownedBy = BigInt.fromString("0");
    }
    return name as Name
}