import allMons from '../../resources/pokemon.json';
import MoveBox from '../pokemon/MoveBox.js';
import TypeIcon from './TypeIcon.js';
import { useState } from 'react';
import TrainingBox from './TrainingBox.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState("Blissey");
    const [level, setLevel] = useState(100);

    return(
        <div className="card"> {/* TODO: Make a new class for this formatting */}
            <h2>{pokemon}</h2>
            <SearchableDropdown
                items={Object.keys(allMons)}
                selectionAction={(selectedMon)=>{
                    setPokemon(selectedMon);
                    props.setType(allMons[selectedMon]["Type"]);
                    console.log(props.ownType);
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
                baseStats={allMons[pokemon]["Base Stats"]}
                stats={props.ownStats}
                setStat={
                    (statName, statValue) =>
                    {props.setStats({...props.ownStats, [statName]: statValue});}
                }
                setStats={props.setStats}
            />
            <MoveBox
                level={level}
                attackerStats={props.ownStats}
                defenderStats={props.opponentStats}
                attackerType={props.ownType}
                defenderType={props.opponentType}
            />
        </div>
    );
}

export default PokemonCard;
