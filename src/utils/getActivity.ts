import {Activity} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export function getActivity(id: string): Activity {
    let activity = Activity.load(id);
    if (!activity) {
        activity = new Activity(id);
        activity.name = ""
        activity.date = BigInt.fromI32(0);
        activity.summoner = BigInt.fromI32(0);
        activity.value = BigInt.fromI32(0)
    }

    return activity as Activity
}