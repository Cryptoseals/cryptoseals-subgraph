import {BigInt} from '@graphprotocol/graph-ts';

export const W_GOLD_SUMMONER = BigInt.fromString("1234567891011121314151617181921");

export const W_ESSENCE_SUMMONER = BigInt.fromString("1234567891011121314151617181922");
export const W_MATERIAL_SUMMONER = BigInt.fromString("1234567891011121314151617181923");

export const STATS_ID = "stats";


class ContractsInterface {
    Random: string;
    Goods: string;
    Armor: string;
    Weapon: string;
    SkillsCodex: string;
    Summoners: string;
    Essence: string;
    Gold: string;
    Attributes: string;
    Avatar: string;
    Skills: string;
    CraftI: string;
    CraftingCommon: string;
    WrappedGold: string;
    WrappedEssence: string;
    WrappedMaterial: string;
    WorldBoss: string;
    Badge: string;
}

export const Contracts: ContractsInterface = {
    "Random": "0x6930E44aF72C8DcE924f7152b942895DD5D944B4",
    "Goods": "0x32e2AA16323FbB20377d39eeF5DDF817FCDbFf28",
    "Armor": "0xbb73cdB5312Eacc9e3dFAF9EB7eB8C39B8c9AFEa",
    "Weapon": "0xe72ee45B57033f9717262F8B4330BB430AFee83E",
    "SkillsCodex": "0xdA0Af9516Fca066E1Baec909dCc6240883911f28",
    "Summoners": "0x7a1cEF3D03f433cC11d1CCEda1115d6C30d5Fb64",
    "Essence": "0x97b919B2eD7D97961b99913380E59cc67B322A2c",
    "Gold": "0xFffdA15E68f70124Bd842CF6F8cB717aF475232D",
    "Attributes": "0x5C96E857215dA4a98e1d26D2A346bFf292bb55dF",
    "Avatar": "0xb9EAccCd238943dD1cA80E119eaBFD1A64dFd1Ad",
    "Skills": "0x2651246D17101f165698fA7d501D5cDb2d152016",
    "CraftI": "0xf33806E401B4d5cfE939364956633Ea683081359",
    "CraftingCommon": "0xC8A2E81fc0E4c273346A9ACF28644bcDaeCB168d",
    "WrappedGold": "0xE67374d93878C0FC4C12Fe76dB4DB41A653d635b",
    "WrappedEssence": "0xb5EC38816561E8b9DB5Ebc957860B341bC8b8e1e",
    "WrappedMaterial": "0xCA2506194312aFeDA9A691f4587C213C80c671Ec",
    "WorldBoss": "0x70Bd31275581236422c4D441081B3D354ff150e4",
    "Badge": "0x662608bDbC52efD0b12deE5132D5bB906efc626D"
}