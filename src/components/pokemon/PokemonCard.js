import allMons from '../../resources/pokemon.json';
import allMoves from '../../resources/moves.json';
import TypeIcon from './TypeIcon.js';
import { useState } from 'react';
import TrainingBox from './TrainingBox.js';
import SearchableDropdown from '../generic/SearchableDropdown.js';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState("Blissey");
    const [move, setMove] = useState("Flail");

    return(
        <div className="card"> {/* TODO: Make a new class for this formatting */}
            <h2>{pokemon}</h2>
            <SearchableDropdown
                items={Object.keys(allMons)}
                selectionAction={(selectedMon)=>{
                    setPokemon(selectedMon);
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
                baseStats={allMons[pokemon]["Base Stats"]}
                stats={props.ownStats}
                setStat={
                    (statName, statValue) =>
                    {props.setStats({...props.ownStats, [statName]: statValue});}
                }
                setStats={props.setStats}
            />
            <SearchableDropdown 
                items={Object.keys(allMoves)}
                selectionAction={(selectedMove)=>setMove(selectedMove)}
            />
        </div>
    );
}

export default PokemonCard;
