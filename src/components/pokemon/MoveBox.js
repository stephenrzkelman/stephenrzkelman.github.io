import allMoves from '../../resources/moves.json';
import { useState, useEffect } from 'react';
import SearchableDropdown from '../generic/SearchableDropdown';
import typeChart from '../../resources/typechart.json';

function MoveBox(props) {
    const [move, setMove] = useState("Flail");
    const [damage, setDamage] = useState(0);

    function damageCalc(){
        let moveInfo = allMoves[move];
        let moveType = moveInfo["type"];
        let moveCat = moveInfo["category"];
        let movePower = Number(moveInfo["power"]);
        let attackerStat;
        let defenderStat;
        if(moveCat === "Special"){
            attackerStat = Number(props.attackerStats["Sp. Atk"]);
            defenderStat = Number(props.defenderStats["Sp. Def"]);
        }
        else if(moveCat === "Physical"){
            attackerStat = Number(props.attackerStats["Attack"]);
            defenderStat = Number(props.defenderStats["Defense"]);
        }
        else{
            return 0;
        }
        let levelMultiplier = Math.floor(2 * (props.level) / 5) + 2;
        let baseMultiplier = Math.floor((levelMultiplier * movePower * attackerStat / defenderStat)/50) + 2;

        let sameTypeAttackBonus = props.attackerType.includes(moveType) ? 1.5 : 1;
        let typeEffectiveness = props.defenderType.reduce(
            (multiplier, type) => multiplier * typeChart[`${moveType}->${type}`],
            1
        );

        let damage = Math.floor(baseMultiplier * sameTypeAttackBonus * typeEffectiveness);

        setDamage(damage);
    }

    useEffect(()=>damageCalc());
    return(
        <div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"baseline",
                width:"100%"
            }}
        >
            <p>Move: </p>
            <SearchableDropdown 
                items={Object.keys(allMoves)}
                selectionAction={(selectedMove)=>setMove(selectedMove)}
            />
            <p
                style={{
                    width:"10rem",
                    textAlign:"right"
                }}
            >Damage: {damage}</p>
        </div>
    )
}

export default MoveBox;