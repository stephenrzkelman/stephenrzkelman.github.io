// import Card from './Card';
import PokemonCard from './PokemonCard';
import { useState } from 'react';

const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};

function Duel(props) {
    const [leftPokemonStats, setLeftPokemonStats] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 1]))
    );
    const [rightPokemonStats, setRightPokemonStats] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 1]))
    )
    return(
        <div className="card-box">
            <PokemonCard 
                ownStats={leftPokemonStats}
                opponentStats={rightPokemonStats} 
                setStats={setLeftPokemonStats}
            />
            <PokemonCard
                ownStats={rightPokemonStats}
                opponentStats={leftPokemonStats} 
                setStats={setRightPokemonStats}
            />
        </div>
    );
}

export default Duel;