import allMons from '../../resources/pokemon.json';
import allMoves from '../../resources/moves.json';
import EVSlider from './EVSlider.js';
import TypeIcon from './TypeIcon.js';
import TextInput from '../generic/TextInput.js';
import { useState } from 'react';
import SearchableDropdown from '../generic/SearchableDropdown.js';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState("Blissey");
    const [move, setMove] = useState("Flail");
    // TODO: is this ok to do without using state?
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [evValues, setEvValues] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [ivValues, setIvValues] = useState(Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0])));
    const [level, setLevel] = useState(100);
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

    function trueStatValue(statName){
        let baseStats = (allMons[pokemon]["Base Stats"]);
        let natureModifies = natures[nature];
        let natureMultiplier = 1;
        if (natureModifies[0] === statName){
            natureMultiplier += 0.1;
        }
        if (natureModifies[1] === statName){
            natureMultiplier -= 0.1;
        }
        if (statName === "HP"){
            let multiplier = 2 * Number(baseStats[statName]) + Number(ivValues[statName]) + Math.floor(Number(evValues[statName])/4);
            return Math.floor(multiplier * Number(level) / 100) + Number(level) + 10;
        }
        else{
            let multiplier = 2 * Number(baseStats[statName]) + Number(ivValues[statName]) + Math.floor(Number(evValues[statName])/4);
            let preNature =  Math.floor(multiplier * Number(level) / 100) + 5;
            return Math.floor(preNature * natureMultiplier);
        }
    }

    function remainingEVs(statName){
        let usedEVs = Object.values(evValues).reduce((sum, ev) => sum + ev,0);
        if(statName) 
            usedEVs -= evValues[statName];
        let unusedEVs = 508 - usedEVs;
        return unusedEVs;
    }

    return(
        <div className="card"> {/* TODO: Make a new class for this formatting */}
            <h2>{pokemon}</h2>
            <SearchableDropdown
                items={Object.keys(allMons)}
                selectionAction={setPokemon}
            />
            <img 
                src={require(`../../resources/images/${pokemon.toLowerCase()}.png`)}
                alt={`${pokemon}`}
                style={{height:"5rem"}}
            />
            {/* TODO: make type-box its own component? */}
            <div className="type-box">
                {allMons[pokemon]["Type"].map(
                    (type)=><TypeIcon type={type}/>)
                }
            </div>
            <div style={{
                display:"flex", 
                flexDirection:"row", 
                alignItems:"baseline"
            }}>
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
                        statName={statAbbrevs[statName]}
                        base={allMons[pokemon]["Base Stats"][statName]}
                        level={level}
                        evValue={evValues[statName]}
                        setEvValue={(newValue) => setEvValues({...evValues, [statName]:newValue})}
                        ivValue={ivValues[statName]}
                        setIvValue={(newValue) => setIvValues({...ivValues, [statName]:newValue})}
                        statValue={trueStatValue(statName)}
                        remainingEVs={remainingEVs(statName)}
                    />
                )
            }
            <SearchableDropdown 
                items={Object.keys(allMoves)}
                selectionAction={(selectedMove)=>setMove(selectedMove)}
            />
        </div>
    );
}

export default PokemonCard;
