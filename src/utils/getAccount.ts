import {Account} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";



export function getAccount (id:string): Account {
    let account = Account.load(id);
    if(!account){
        account = new Account(id);
        account.summonerBalance = BigInt.fromString("0")
        account.wEssenceBalance = BigInt.fromString("0")
        account.wGoldBalance = BigInt.fromString("0")
        account.wMaterialBalance = BigInt.fromString("0")
    }
    return  account as Account;
}