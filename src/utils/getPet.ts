import {Pet} from "../../generated/schema";
import {Address, BigInt} from "@graphprotocol/graph-ts";

export const getPet = (id: string): Pet => {
    let pet = Pet.load(id);
    if(!pet) {
        pet = new Pet(id);
        pet.equippedBy = BigInt.fromString("99999999999999999999");
        pet.contract = Address.zero()
        pet.tokenId = BigInt.fromString("0")
    }
    return pet as Pet;
}