import {Attributes} from '../../generated/schema'
import {BigInt} from "@graphprotocol/graph-ts";


export function getAttributes(id: string): Attributes {
    let attributes = Attributes.load(id)
    if(!attributes){
        attributes = new Attributes(id);
        attributes.STR = BigInt.fromString("0");
        attributes.DEX = BigInt.fromString("0");
        attributes.CON = BigInt.fromString("0");
        attributes.INT = BigInt.fromString("0");
        attributes.WIS = BigInt.fromString("0");
        attributes.CHA = BigInt.fromString("0");
    }
    return attributes as Attributes;
}
