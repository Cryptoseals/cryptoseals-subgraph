const {
    AvatarBackgrounds,
    AvatarFacialHairs,
    AvatarHairs,
    AvatarMouths,
    AvatarOutfits,
    AvatarSkins, AvatarEyes, AvatarHeadgear, AvatarHorns, AvatarRaceSpecify, Summoner
} = require("./avatar.js");

class Random {
    useA;
    hash;
    prngA;
    prngB;

    constructor(hash) {
        this.hash = hash;
        this.useA = false;
        let sfc32 = function (uint128Hex) {
            let a = parseInt(uint128Hex.substr(0, 8), 16);
            let b = parseInt(uint128Hex.substr(8, 8), 16);
            let c = parseInt(uint128Hex.substr(16, 8), 16);
            let d = parseInt(uint128Hex.substr(24, 8), 16);
            return function () {
                a |= 0;
                b |= 0;
                c |= 0;
                d |= 0;
                let t = (((a + b) | 0) + d) | 0;
                d = (d + 1) | 0;
                a = b ^ (b >>> 9);
                b = (c + (c << 3)) | 0;
                c = (c << 21) | (c >>> 11);
                c = (c + t) | 0;
                return (t >>> 0) / 4294967296;
            };
        };
        // seed prngA with first half of tokenData.hash
        // @ts-ignore
        this.prngA = new sfc32(this.hash.substr(2, 32));
        // seed prngB with second half of tokenData.hash
        // @ts-ignore
        this.prngB = new sfc32(this.hash.substr(34, 32));
        for (let i = 0; i < 1e6; i += 2) {
            this.prngA();
            this.prngB();
        }
    }

    random_dec() {
        this.useA = !this.useA;
        return this.useA ? this.prngA() : this.prngB();
    }

    random_num(a, b) {
        return a + (b - a) * this.random_dec();
    }

    random_int(a, b) {
        return Math.floor(this.random_num(a, b + 1));
    }

    random_bool(p) {
        return this.random_dec() < p;
    }

    random_choice(list) {
        return list[this.random_int(0, list.length - 1)];
    }
}

const NoneProp = {
    name: "None",
    file: "none"
}
const AvatarIdToName = {
    0: "Human", 1: "Orc", 2: "Undead", 3: "Verdant", 4: "Demonic", 5: "Angelic", 6: "Dwarf"
}

function random_hash() {
    let chars = "0123456789abcdef";
    let result = '0x';
    for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

let backgroundImg, skinImg, skinSpecificImg,
    outfitImg, mouthImg, hairImg, facialHairImg, eyeImg, headGearImg,
    hornImage;
let gender = "Male"

function gethash() {
    const hash = random_hash()
    const rng = new Random(hash)
    let determineRace = rng.random_choice([0, 1, 2, 3, 4, 5, 6])
    let AvatarSkinsByRace = AvatarSkins.filter(e => e.file.indexOf(AvatarIdToName[determineRace].toLowerCase()) > -1 || e.name.indexOf(AvatarIdToName[determineRace].toLowerCase()) > -1)
    let AvatarByGender = AvatarSkinsByRace.filter((a) => {
        if (gender == "Female") {
            return a.file.toLowerCase().indexOf(gender.toLowerCase()) > -1
                ||
                a.name.toLowerCase().indexOf(gender.toLowerCase()) > -1
        } else {
            return a.file?.toLowerCase().indexOf("female") < 0
                ||
                a.name?.toLowerCase().indexOf("female") < 0
        }
    })
    let determinedSkin = rng.random_choice(AvatarByGender)
    skinImg = `/assets/characters/skins/${determinedSkin.file}.png`
    let determinedBackground = rng.random_choice(AvatarBackgrounds)
    backgroundImg = `/assets/characters/backgrounds/${determinedBackground.file}.png`
    let hasSpecificItem = rng.random_dec() > 0.9
    let determinedSkinSpecific = hasSpecificItem ? rng.random_choice(AvatarRaceSpecify) : NoneProp
    skinSpecificImg = `/assets/characters/racespecify/${determinedSkinSpecific.file}.png`
    let determinedOutfit = rng.random_choice(AvatarOutfits)
    outfitImg = `/assets/characters/outfits/${determinedOutfit.file}.png`
    let determinedMouth = rng.random_choice(AvatarMouths)
    mouthImg = `/assets/characters/mouths/${determinedMouth.file}.png`
    let determinedHair = rng.random_choice(AvatarHairs)
    hairImg = `/assets/characters/hairs/${determinedHair.file}.png`
    let determinedFacialHair = gender == 'Female' ? NoneProp : rng.random_choice(AvatarFacialHairs)
    facialHairImg = `/assets/characters/facialhair/${determinedFacialHair.file}.png`
    let determinedEye = rng.random_choice(AvatarEyes)
    eyeImg = `/assets/characters/eyes/${determinedEye.file}.png`
    let hasHadGear = rng.random_dec() > 0.15
    let determinedHeadGear = hasHadGear ? rng.random_choice(AvatarHeadgear) : NoneProp
    headGearImg = `/assets/characters/headgear/${determinedHeadGear.file}.png`
    let hasHorn = rng.random_dec() > 0.9
    let determinedHornImage = hasHorn ? rng.random_choice(AvatarHorns) : NoneProp
    hornImage = `/assets/characters/horns/${determinedHornImage.file}.png`

    if (determinedBackground.file === "seal0" &&
        determinedHeadGear.file == "goldenmask"
    ) {
        console.log(hash)
        console.log(hash)
        console.log(hash)
        return hash
    } else {
        console.log(`-`)
        return gethash()
    }
}


gethash()