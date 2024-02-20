// import Card from './Card';
import PokemonCard from './PokemonCard';
import { useState } from 'react';
import { statCalc } from '../../utils.js'

const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};

function Duel(props) {
    const [leftPokemonStats, setLeftPokemonStats] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 1]))
    );
    const [rightPokemonStats, setRightPokemonStats] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 1]))
    );
    const [rightPokemonType, setRightPokemonType] = useState([]);
    const [leftPokemonType, setLeftPokemonType] = useState([]);
    
    
    const updateAllStats = (statSetter) => function(baseStats, curEVs, curIVs, curNature, level){
        let newStats = Object.fromEntries(Object.keys(statAbbrevs).map(
            statName => [
                statName, 
                statCalc(
                    statName, 
                    baseStats[statName], 
                    curEVs[statName], 
                    curIVs[statName], 
                    curNature, 
                    level
                )]
        ))
        statSetter(newStats);
    }

    return(
        <div className="card-box">
            <PokemonCard 
                ownStats={leftPokemonStats}
                ownType={leftPokemonType}
                opponentStats={rightPokemonStats} 
                opponentType={rightPokemonType}
                setStats={setLeftPokemonStats}
                updateAllStats={updateAllStats(setLeftPokemonStats)}
                setType={setLeftPokemonType}
            />
            <PokemonCard
                ownStats={rightPokemonStats}
                ownType={rightPokemonType}
                opponentStats={leftPokemonStats} 
                opponentType={rightPokemonType}
                setStats={setRightPokemonStats}
                updateAllStats={updateAllStats(setRightPokemonStats)}
                setType={setRightPokemonType}
            />
        </div>
    );
}

export default Duel;