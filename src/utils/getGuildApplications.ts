import {SummonerGuildApplication} from "../../generated/schema";
import {BigInt} from "@graphprotocol/graph-ts";

export function getGuildApplications(id: string): SummonerGuildApplication {
    let application = SummonerGuildApplication.load(id);
    if (!application) {
        application = new SummonerGuildApplication(id);
        application.appliedTo = new Array<BigInt>(0);
        application.summoner = id;
    }
    return application as SummonerGuildApplication
}