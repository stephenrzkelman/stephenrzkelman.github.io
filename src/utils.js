Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
}

export const natures = {
    "Adamant":	["Attack",	"Sp. Atk"],
    "Bashful":	["Sp. Atk",	"Sp. Atk"],
    "Bold":	    ["Defense",	"Attack"],
    "Brave":    ["Attack",	"Speed"],
    "Calm":	    ["Sp. Def",	"Attack"],
    "Careful":	["Sp. Def",	"Sp. Atk"],
    "Docile":   ["Defense",	"Defense"],
    "Gentle":   ["Sp. Def",	"Defense"],
    "Hardy":    ["Attack",	"Attack"],
    "Hasty":    ["Speed",   "Defense"],
    "Impish":   ["Defense",	"Sp. Atk"],
    "Jolly":    ["Speed",   "Sp. Atk"],
    "Lax":	    ["Defense",	"Sp. Def"],
    "Lonely":   ["Attack",	"Defense"],
    "Mild":	    ["Sp. Atk",	"Defense"],
    "Modest":   ["Sp. Atk",	"Attack"],
    "Naive":    ["Speed",   "Sp. Def"],
    "Naughty":	["Attack",	"Sp. Def"],
    "Quiet":    ["Sp. Atk",	"Speed"],
    "Quirky":   ["Sp. Def",	"Sp. Def"],
    "Rash":	    ["Sp. Atk",	"Sp. Def"],
    "Relaxed":	["Defense",	"Speed"],
    "Sassy":    ["Sp. Def",	"Speed"],
    "Serious":	["Speed",   "Speed"],
    "Timid":    ["Speed",   "Attack"]
}


export function statCalc(statName, baseStat, statEV, statIV, pkmnNature, level){
    let natureModifies = natures[pkmnNature];
    let natureMultiplier = 1;
    if (natureModifies[0] === statName){
        natureMultiplier += 0.1;
    }
    if (natureModifies[1] === statName){
        natureMultiplier -= 0.1;
    }
    let statValue;
    if (statName === "HP"){
        let multiplier = 2 * Number(baseStat) + Number(statIV) + Math.floor(Number(statEV)/4);
        statValue = Math.floor(multiplier * level / 100) + level + 10;
    }
    else{
        let multiplier = 2 * Number(baseStat) + Number(statIV) + Math.floor(Number(statEV)/4);
        let preNature =  Math.floor(multiplier * level / 100) + 5;
        statValue = Math.floor(preNature * natureMultiplier);
    }
    return statValue;
}