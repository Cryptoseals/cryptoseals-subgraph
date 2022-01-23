import {Stats} from '../../generated/schema'
import {BigInt} from "@graphprotocol/graph-ts/index";

export function getStats(id: string): Stats {
    let stats = Stats.load(id)
    if (!stats) {
        stats = new Stats(id);
        stats.essenceSupply = BigInt.fromString("0");
        stats.goldSupply = BigInt.fromString("0");
        stats.summonerSupply = BigInt.fromString("0");
        stats.wEssenceSupply = BigInt.fromString("0");
        stats.wGoldSupply = BigInt.fromString("0");
    }
    return stats as Stats;
}