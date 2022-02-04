const contracts = {
    "Random": "0xDc73397A9656E3399d11b199e7A043BdDed7361A",
    "Goods": "0xbC3D8D2b24C07197E8C0DeECB4ecB5e7367B7546",
    "Armor": "0xF0b830d8F3E0BC4E319F450E947269697250216F",
    "Weapon": "0x923fc8F8381EE158C44788B725f57D4b557509c7",
    "SkillsCodex": "0x10D0d12f6fF9e1C27212a108d21DC0507E56F83C",
    "Summoners": "0x3f514d31C60F87cFf52195f875eAF1BAFF2d278A",
    "Essence": "0xB74F9510F68f4A4AEB65c37AD4B69F554b2a8194",
    "Gold": "0xf6cDed48A089fDB0b8DCBaFA5A5E69F9bD8DD922",
    "Attributes": "0x47B31722b5d8A4c4Fe7AD721d916EAFa65A671fD",
    "Avatar": "0x8925a9b0adf634cecc1d44d6B224C9730C9F654f",
    "Skills": "0x47C39A8d1Aa216c73939bA714bcc6487259837b4",
    "CraftI": "0x06c65d6F8139E6Cbf6536181d3e2B43f26ff32B3",
    "CraftingCommon": "0x1f23c14bCDbA0ba0889bB7b393Ae95a0700335E5",
    "WrappedGold": "0xD602A2386EDE7ce09aF0c65A31D44D6001140B4d",
    "WrappedEssence": "0x796E9809a9A5CFc1608e55685FFeE04761542781",
    "WrappedMaterial": "0x1DC552DB5eA828Ad41c188f536Cc114F1B5dfE86",
    "WorldBoss": "0xC489B7CF9d5e00539664F70cc2e16553A350fB83",
    "Badge": "0x9A3Ca6617c592904Ae92728798F5a4C0fd73fE4C",
    "Guilds": "0xe09ceACb906b90aa0e7d331668095fCA418cc5ff",
    "Fame": "0x61f9f13e0821956CDC9E173D7eA7217c3f902a94",
    "Chests": "0x72802b523891822A971DEB80725986135Eb5DbD6"
}
const fs = require('fs');

const file = fs.readFileSync('./subgraph-template.yaml', {encoding: "utf-8"})
let content = file.toLocaleString("utf-8");
content = content.replace(/"address"/g, `"${contracts.Summoners}"`);
content = content.replace(/address2/g, contracts.WorldBoss);
content = content.replace(/address3/g, contracts.Skills);
content = content.replace(/address4/g, contracts.Attributes);
content = content.replace(/address5/g, contracts.CraftI);
content = content.replace(/address6/g, contracts.CraftingCommon);
content = content.replace(/address7/g, contracts.Essence);
content = content.replace(/address8/g, contracts.Gold);
content = content.replace(/address9/g, contracts.WrappedEssence);
content = content.replace(/address10/g, contracts.WrappedGold);
content = content.replace(/address11/g, contracts.WrappedMaterial);
content = content.replace(/address12/g, contracts.Fame);
content = content.replace(/address13/g, contracts.Guilds);
content = content.replace(/address14/g, contracts.Chests);
// content = content.replace(/address15/g, contracts.Badge);
fs.writeFileSync('./subgraph.yaml', content, {encoding: "utf-8"})