import { useState, useEffect } from 'react';
import TextInput from '../generic/TextInput.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';
import EVSlider from './EVSlider.js';


function TrainingBox(props) {
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [evs, setEVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [remainingEVs, setRemainingEVs] = useState(508);
    const [ivs, setIVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [nature, setNature] = useState("Serious");
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
            statValue = Math.floor(multiplier * Number(props.level) / 100) + Number(props.level) + 10;
        }
        else{
            let multiplier = 2 * Number(baseStat) + Number(statIV) + Math.floor(Number(statEV)/4);
            let preNature =  Math.floor(multiplier * Number(props.level) / 100) + 5;
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

    function updateStat(statName, ev, iv, nature){
        props.setStats({...props.stats, [statName]:statCalc(statName, ev, iv, nature)})
    }

    function updateNature(newNature){
        setNature(newNature);
        updateAllStats(evs, ivs, newNature);
    }

    function updateEV(statName, newEV){
        let availableEVs = remainingEVs + evs[statName];
        newEV = Math.max(0, Math.min(252, availableEVs, newEV));
        setEVs({...evs, [statName]:newEV});
        setRemainingEVs(availableEVs - newEV);
        updateStat(statName, newEV, ivs[statName], nature);
    }

    function updateIV(statName, newIV){
        newIV = Math.max(0, Math.min(31, newIV));
        setIVs({...ivs, [statName]:newIV});
        updateStat(statName, evs[statName], newIV, nature);
    }

    useEffect(()=>updateAllStats(evs, ivs, nature), []);

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
                    value={props.level}
                    onChange={props.setLevel}
                    width={2}
                />
            </div>
            <div style={{
                display:"flex", 
                flexDirection:"row", 
                alignItems:"baseline",
                alignSelf:"center"
            }}>
                <p> Nature:</p>
                <SearchableDropdown
                    items={Object.entries(natures).map(
                        ([nature, [plus, minus]], _)=>
                            `${nature} (+${statAbbrevs[plus]}, -${statAbbrevs[minus]})`
                    )}
                    selectionAction={(natureText)=>{
                        updateNature(natureText.split(" ")[0]);
                    }}
                />
            </div>
            <div style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"stretch",
                width:"100%"
            }}>
                <div style={{width:"3rem"}}/>
                {"EVs"}
                <div style={{width:"9rem"}}/>
                {"IVs"}
                <div style={{width:"1.5rem"}}/>
                {"Stats"}
            </div>
            {
                (Object.keys(statAbbrevs)).map(
                    (statName) => <EVSlider 
                        statName={statName}
                        statValue={props.stats[statName]}
                        evValue={evs[statName]}
                        setEvValue={(newValue) => {
                            updateEV(statName, newValue);
                        }}
                        ivValue={ivs[statName]}
                        setIvValue={(newValue) => {
                            updateIV(statName, newValue);
                        }}
                    />
                )
            }
            {`Remaining EVs: ${remainingEVs}`}
        </div>
    )
}

export default TrainingBox;