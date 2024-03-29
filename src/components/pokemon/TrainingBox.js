import { useState, useEffect } from 'react';
import TextInput from '../generic/TextInput.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';
import EVSlider from './EVSlider.js';
import { natures, statCalc } from '../../utils.js'


function TrainingBox(props) {
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [evs, setEVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [remainingEVs, setRemainingEVs] = useState(508);
    const [ivs, setIVs] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [nature, setNature] = useState("Serious");

    function updateStat(statName, ev, iv, nature){
        props.setStats({
            ...props.stats, 
            [statName]:statCalc(
                statName, 
                props.baseStats[statName],
                ev, 
                iv, 
                nature,
                props.level
            )
        })
    }

    function updateLevel(newLevel){
        newLevel = Number(newLevel.replace(/\D/g,''));
        newLevel = Math.max(0,Math.min(100, newLevel));
        props.setLevel(newLevel);
        props.updateAllStats(props.baseStats, evs, ivs, nature, newLevel);
    }

    function updateNature(newNature){
        setNature(newNature);
        props.updateAllStats(props.baseStats, evs, ivs, newNature, props.level);
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

    useEffect(()=>props.updateAllStats(props.baseStats, evs, ivs, nature, props.level), [props.baseStats]);

    return(
        <div className="multi-row">
            <div className="single-row-centered" style={{justifyContent:"space-around"}}>
                <div className="single-row" style={{width:"20%"}}>
                    <p>Level: </p>
                    <TextInput 
                        value={props.level}
                        onChange={updateLevel}
                        width={2}
                    />
                </div>
                <div className="single-row" style={{width:"60%"}}>
                    <p> Nature:</p>
                    <SearchableDropdown
                        items={Object.entries(natures).map(
                            ([nature, [plus, minus]], _)=>
                                `${nature} (+${statAbbrevs[plus]}, -${statAbbrevs[minus]})`
                        )}
                        selectionAction={(natureText)=>{
                            updateNature(natureText.split(" ")[0]);
                        }}
                        placeholder="-- Select Nature --"
                    />
                </div>
            </div>
            {/* TODO: change this part of training box to table display */}
            <div 
                className="single-row" 
                style={{height:"0.5rem"}}
            >
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
            <div style={{height:"0.5rem"}}/>
            <div className="single-row">
                <div style={{width:"0.65rem"}}/>
                {`Remaining EVs: ${remainingEVs}`}
            </div>
        </div>
    )
}

export default TrainingBox;