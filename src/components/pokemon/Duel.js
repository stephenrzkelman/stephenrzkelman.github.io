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
                opponentStats={rightPokemonStats} 
                setStat={
                    (statName, statValue) =>
                    console.log(`set ${statName} to ${statValue}`)
                }
            />
            <PokemonCard
                opponentStats={leftPokemonStats} 
                setStat={
                    (statName, statValue) => {
                        // setRightPokemonStats({...rightPokemonStats, [statName]:statValue});
                    }
                }
            />
        </div>
    );
}

export default Duel;