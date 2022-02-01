import {ChestOpen, CryptoSealsChests, Transfer} from "../generated/CryptoSealsChests/CryptoSealsChests";
import {Bytes} from "@graphprotocol/graph-ts/index";
import {getChest} from "./utils/getChest";
import {Address} from "@graphprotocol/graph-ts";
import {Contracts} from "./utils/constants";


function handleTransfer (event: Transfer): void{
    const chest = getChest(event.params.tokenId.toString());
    chest.owner = event.params.to as Bytes;
    if(event.params.from == Address.zero()){
        chest.opened = false;
    }
    const chestContract = CryptoSealsChests.bind(Address.fromString(Contracts.Chests))
    let call = chestContract.try_ChestIdToType(event.params.tokenId);
    if(!call.reverted) {
        chest.chestType = call.value;
    }
    chest.save()
}

function handleChestOpen(event: ChestOpen) : void{
    // TODO , EVENTE ID EKLE
    // const chest = getChest(event.toString());

}
