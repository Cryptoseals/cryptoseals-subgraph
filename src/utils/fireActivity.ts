import {BigInt} from "@graphprotocol/graph-ts";
import {getActivity} from "./getActivity";

export function fireActivity(id: string, name: string, value: BigInt, summoner: BigInt, date: BigInt): void {
    let activity = getActivity(id);
    activity.name = name;
    activity.value = value;
    activity.summoner = summoner;
    activity.date = date;
    activity.save()
}