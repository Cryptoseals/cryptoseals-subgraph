export function getClass(id: string): (string) {
    if (id == "1") {
        return "Barbarian";
    } else if (id == "2") {
        return "Bard";
    } else if (id == "3") {
        return "Cleric";
    } else if (id == "4") {
        return "Druid";
    } else if (id == "5") {
        return "Fighter";
    } else if (id == "6") {
        return "Monk";
    } else if (id == "7") {
        return "Paladin";
    } else if (id == "8") {
        return "Ranger";
    } else if (id == "9") {
        return "Rogue";
    } else if (id == "10") {
        return "Sorcerer";
    } else if (id == "11") {
        return "Wizard";
    } else if (id == "12") {
        return "Necromancer";
    } else if (id == "13") {
        return "Warlock";
    } else if (id == "14") {
        return "Engineer";
    }
    return ""
}