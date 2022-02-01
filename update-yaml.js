const contracts = {
    "Random": "0x746933F2F87a3cFf72543aa2480DeD2f0BD271D2",
    "Goods": "0x1e3b0858C84cde44dE7fd18b5a58C1ffCEc157B0",
    "Armor": "0x20DcFe3d1479D3Af39734C6601C349c0d9ad892B",
    "Weapon": "0x6F56615108F7dBc056c445f060848710D75a0e75",
    "SkillsCodex": "0xB61a1e4a723DD3cd3D320887aFc4231700Eb74a1",
    "Summoners": "0x417DB52EE7e5b57b1E81759D506062725Cd00862",
    "Essence": "0xA7630Eb91BF2744E7D86D5A8B0De7F9A3314EA49",
    "Gold": "0xEb8ffB105F7906E738371D65554e744B3f995725",
    "Attributes": "0x4f3e051916aEAa1570C593E509aFB3eE7e68a6d7",
    "Avatar": "0x393A54d54b0539e9D182a0a9E8a5c24D8BCA6c6e",
    "Skills": "0x92bd6cb867d540ce08B2729057eC8ee290c82436",
    "CraftI": "0xfEa04543507A3e98aaF4940eD3Fb778F1f719D28",
    "CraftingCommon": "0x4e08cACc2E6ed004a7B8433dfA125Ae95378B4b3",
    "WrappedGold": "0x3Bea7c8fc8B3C89aFfA304ad02907257eCa39501",
    "WrappedEssence": "0x8F97A49DA1F606ce79527e0F3Bc57DdC68929d93",
    "WrappedMaterial": "0x1ecf1d6e8B0a9f2f4DAb70645fd3e09AAa413eD6",
    "WorldBoss": "0x8a13812E1138496f93b2c18Fd5ac5FD102240F28",
    "Badge": "0x2fe805437e4ea3408Ec40207c016c054866A5722",
    "Guilds": "0x52671aF6F0De4a034526005C2d39a9C644Cb51e6",
    "Fame": "0x9BC5cDfe6a0e286465452127Fb7CE80fC5559dc0",
    "Chests": "0xD504640CEc225bD84b855308b34D10f646B9bf03"
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
fs.writeFileSync('./subgraph.yaml', content, {encoding: "utf-8"})