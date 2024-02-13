import { useState, useEffect } from 'react';
import TextInput from '../generic/TextInput.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';
import EVSlider from './EVSlider.js';


function TrainingBox(props) {
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [evs, setEVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [ivs, setIVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [nature, setNature] = useState("Serious");
    const [level, setLevel] = useState(100);
    const natures = {
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

    function statCalc(statName, statEV, statIV, pkmnNature){
        let baseStat = props.baseStats[statName];
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
            statValue = Math.floor(multiplier * Number(level) / 100) + Number(level) + 10;
        }
        else{
            let multiplier = 2 * Number(baseStat) + Number(statIV) + Math.floor(Number(statEV)/4);
            let preNature =  Math.floor(multiplier * Number(level) / 100) + 5;
            statValue = Math.floor(preNature * natureMultiplier);
        }
        return statValue;
    }

    function updateAllStats(curEVs, curIVs, curNature){
        let newStats = Object.fromEntries(Object.keys(statAbbrevs).map(
            statName => [statName, statCalc(statName, curEVs[statName], curIVs[statName], curNature)]
        ))
        props.setStats(newStats);
    }

    function remainingEVs(statName){
        let usedEVs = Object.values(evs).reduce((sum, ev) => sum + ev, 0);
        if(statName) 
            usedEVs -= evs[statName];
        let unusedEVs = 508 - usedEVs;
        console.log(`remainingEVs(${statName}) -- EVs: ${Object.entries(evs)}`);
        return unusedEVs;
    }

    useEffect(()=>updateAllStats(evs, ivs, nature));

    return(
        <div
            style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"baseline",
                justifyContent:"center",
                width:"100%"
            }}
        >
            <div
                style={{
                    display:"flex", 
                    flexDirection:"row", 
                    alignItems:"baseline",
                    alignSelf:"center"
                }}
            >
                <p>Level: </p>
                <TextInput 
                    value={level}
                    onChange={setLevel}
                    width={2}
                />
            </div>
            <div style={{
                display:"flex", 
                flexDirection:"row", 
                alignItems:"baseline"
            }}>
                <p> Nature:</p>
                <SearchableDropdown
                    items={Object.entries(natures).map(
                        ([nature, [plus, minus]], _)=>
                            `${nature} (+${statAbbrevs[plus]}, -${statAbbrevs[minus]})`
                    )}
                    selectionAction={(natureText)=>{
                        setNature(natureText.split(" ")[0]);
                    }}
                />
            </div>
            {
                (Object.keys(statAbbrevs)).map(
                    (statName) => <EVSlider 
                        statName={statName}
                        statValue={props.stats[statName]}
                        evValue={evs[statName]}
                        setEvValue={(newValue) => {
                            setEVs({...evs, [statName]:newValue});
                        }}
                        ivValue={ivs[statName]}
                        setIvValue={(newValue) => {
                            setIVs({...ivs, [statName]:newValue});
                        }}
                        remainingEVs={remainingEVs}
                    />
                )
            }
        </div>
    )
}

export default TrainingBox;