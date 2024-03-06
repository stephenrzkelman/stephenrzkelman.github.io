import allMons from '../../resources/pokemon.json';
import GameData from './GameData.js';
import MoveBox from '../pokemon/MoveBox.js';
import TypeIcon from './TypeIcon.js';
import { useState } from 'react';
import TrainingBox from './TrainingBox.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState("Blissey");
    const [level, setLevel] = useState(100);
    const [baseStats, setBaseStats] = useState(allMons[pokemon]["Base Stats"])

    return(
        <div className="card"> {/* TODO: Make a new class for this formatting */}
            {/* <h2>{pokemon}</h2> */}
            <SearchableDropdown
                items={Object.keys(allMons)}
                selectionAction={(selectedMon)=>{
                    setPokemon(selectedMon);
                    props.setType(allMons[selectedMon]["Type"]);
                    setBaseStats(allMons[selectedMon]["Base Stats"]);
                }}
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
            <TrainingBox 
                level={level}
                setLevel={setLevel}
                baseStats={baseStats}
                stats={props.ownStats}
                setStat={
                    (statName, statValue) =>
                    {props.setStats({...props.ownStats, [statName]: statValue});}
                }
                updateAllStats={props.updateAllStats}
                setStats={props.setStats}
            />
            <div style={{height:"0.5rem"}}/>
            <GameData 
                attackerStatChanges={props.ownStatChanges}
                setStatChange={
                    (statName, statChange) =>
                    {props.setStatChanges({...props.ownStatChanges, [statName]: statChange});}
                }
            />
            <div style={{height:"1rem"}}/>
            <MoveBox
                level={level}
                attackerStats={props.ownStats}
                attackerStatChanges={props.ownStatChanges}
                defenderStats={props.opponentStats}
                defenderStatChanges={props.opponentStatChanges}
                attackerType={props.ownType}
                defenderType={props.opponentType}
            />
        </div>
    );
}

export default PokemonCard;
