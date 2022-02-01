
import {Contribution} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts/index";

export function getContribution(id: string) : Contribution {
    let item = Contribution.load(id);
    if(!item) {
        item = new Contribution(id);
        item.essence = BigInt.fromString("0")
        item.gold = BigInt.fromString("0")
        item.material = BigInt.fromString("0")
        item.guild = "0"
    }
    return item as Contribution
}