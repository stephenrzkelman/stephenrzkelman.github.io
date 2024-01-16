import allMons from '../resources/pokemon.json';
import Stat from './Stat.js';
import EVSlider from './EVSlider.js';
import TypeIcon from './TypeIcon.js';
import { useState } from 'react';
import SearchableDropdown from './SearchableDropdown.js';

function PokemonCard(props) {
    const [pokemon, setPokemon] = useState("Blissey");
    const [hpev, setHpev] = useState(0);
    return(
        <div className="card"> {/* TODO: Make a new class for this formatting */}
            <h2>{pokemon}</h2>
            <SearchableDropdown
                items={Object.keys(allMons)}
                selectionAction={setPokemon}
            />
            <img 
                src={require(`../resources/images/${pokemon.toLowerCase()}.png`)}
                alt={`${pokemon}`}
                style={{height:"5rem"}}
            />
            {/* TODO: make type-box its own component? */}
            <div className="type-box">
                {allMons[pokemon]["Type"].map(
                    (type)=><TypeIcon type={type}/>)
                }
            </div>
            {/* TODO: make stat-box its own component? */}
            <div className="stat-box">
                {Object.entries(allMons[pokemon]["Base Stats"]).map(
                    ([statName, statValue]) => <Stat statName={statName} statValue={statValue}/>
                )}
            </div>
            {/* <div className="actions">
                <button 
                    className="button"
                >
                    OK
                </button>
            </div>*/ }
            {/* TODO: ev sliders */}
            <EVSlider hpev={hpev} setHpev={setHpev}/>
        </div>
    );
}

export default PokemonCard;