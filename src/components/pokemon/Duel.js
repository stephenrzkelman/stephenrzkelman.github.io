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
    const [leftPokemonStatChanges, setLeftPokemonStatChanges] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0]))
    );
    const [rightPokemonStatChanges, setRightPokemonStatChanges] = useState(
        Object.fromEntries(Object.keys(statAbbrevs).map(statName => [statName, 0]))
    );
    
    
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
                ownStatChanges={leftPokemonStatChanges}
                ownType={leftPokemonType}
                opponentStats={rightPokemonStats} 
                opponentStatChanges={rightPokemonStatChanges}
                opponentType={rightPokemonType}
                setStats={setLeftPokemonStats}
                setStatChanges={setLeftPokemonStatChanges}
                updateAllStats={updateAllStats(setLeftPokemonStats)}
                setType={setLeftPokemonType}
            />
            <PokemonCard
                ownStats={rightPokemonStats}
                ownStatChanges={rightPokemonStatChanges}
                ownType={rightPokemonType}
                opponentStats={leftPokemonStats} 
                opponentStatChanges={leftPokemonStatChanges}
                opponentType={leftPokemonType}
                setStats={setRightPokemonStats}
                setStatChanges={setRightPokemonStatChanges}
                updateAllStats={updateAllStats(setRightPokemonStats)}
                setType={setRightPokemonType}
            />
        </div>
    );
}

export default Duel;