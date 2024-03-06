import allMoves from '../../resources/moves.json';
import { useState, useEffect } from 'react';
import SearchableDropdown from '../generic/SearchableDropdown';
import StatModifier from './StatModifier';
import typeChart from '../../resources/typechart.json';

function MoveBox(props) {
    const [move, setMove] = useState("Flail");
    const [damage, setDamage] = useState([0,0]);
    const [displayAsPercent, setDisplayAsPercent] = useState(true);

    
    function statModifierCalc(statChange){
        if(statChange >= 0){
            return (2 + statChange)/2;
        }
        else{
            return 2/(2-statChange);
        }
    }
    
    function damageCalc(){
        let moveInfo = allMoves[move];
        let moveType = moveInfo["type"];
        let moveCat = moveInfo["category"];
        let movePower = Number(moveInfo["power"]);
        let attackerStat;
        let attackerCritStat;
        let defenderStat;
        let defenderCritStat;
        if(moveCat === "Special"){
            let attackerEntryStat = Number(props.attackerStats["Sp. Atk"]);
            attackerStat = attackerEntryStat * statModifierCalc(props.attackerStatChanges["Sp. Atk"]);
            attackerCritStat = Math.max(attackerEntryStat, attackerStat);
            let defenderEntryStat = Number(props.defenderStats["Sp. Def"]);
            defenderStat = defenderEntryStat * statModifierCalc(props.defenderStatChanges["Sp. Def"]);
            defenderCritStat = Math.min(defenderEntryStat, defenderStat);
        }
        else if(moveCat === "Physical"){
            let attackerEntryStat = Number(props.attackerStats["Attack"]);
            attackerStat = attackerEntryStat * statModifierCalc(props.attackerStatChanges["Attack"]);
            attackerCritStat = Math.max(attackerEntryStat, attackerStat);
            let defenderEntryStat = Number(props.defenderStats["Defense"]);
            defenderStat = defenderEntryStat * statModifierCalc(props.defenderStatChanges["Defense"]);
            defenderCritStat = Math.min(defenderEntryStat, defenderStat);
        }
        else{
            return 0;
        }
        let levelMultiplier = Math.floor(2 * (props.level) / 5) + 2;
        let baseMultiplier = Math.floor((levelMultiplier * movePower * attackerStat / defenderStat)/50) + 2;
        let baseCritMultiplier = Math.floor((levelMultiplier * movePower * attackerCritStat / defenderCritStat)/50) + 2;

        let sameTypeAttackBonus = props.attackerType.includes(moveType) ? 1.5 : 1;
        let typeEffectiveness = props.defenderType.reduce(
            (multiplier, type) => multiplier * typeChart[`${moveType}->${type}`],
            1
        );

        let highDamage = Math.floor(baseMultiplier * sameTypeAttackBonus * typeEffectiveness);
        let lowDamage = Math.floor(0.85 * highDamage);
        let critHighDamage = Math.floor(baseCritMultiplier * sameTypeAttackBonus * typeEffectiveness * 1.5);
        let critLowDamage = Math.floor(0.85 * critHighDamage);
        if(displayAsPercent){
            highDamage = `${(100 * highDamage/props.defenderStats["HP"]).toPrecision(4)}%`;
            lowDamage = `${(100 * lowDamage/props.defenderStats["HP"]).toPrecision(4)}%`;
            critHighDamage = `${(100 * critHighDamage/props.defenderStats["HP"]).toPrecision(4)}%`;
            critLowDamage = `${(100 * critLowDamage/props.defenderStats["HP"]).toPrecision(4)}%`;
        }
        setDamage([lowDamage, highDamage, critLowDamage, critHighDamage]);
    }

    useEffect(()=>damageCalc());
    return(
        <div
            style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"baseline",
                justifyContent:"flex-start",
                width:"100%"
            }}
        >
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
                <table
                    style={{
                        width:"27rem",
                        textAlign:"right"
                    }}
                >
                    <tr>
                        <td>Damage:</td>
                        <td>{damage[0]}</td>
                        <td>-</td>
                        <td>{damage[1]}</td>
                    </tr>
                    <tr>
                        <td>Crit:</td>
                        <td>{damage[2]}</td>
                        <td>-</td>
                        <td>{damage[3]}</td>
                    </tr>
                </table>
            </div>
            <div
            style={{
                display:"flex",
                flexDirection:"row",
                alignItems:"baseline",
                justifyContent:"flex-end",
                width:"100%"
            }}>
                <p>Display damage as: </p>
                <button className="btn" onClick={()=>setDisplayAsPercent(true)}>
                %
                </button>
                <button className="btn" onClick={()=>setDisplayAsPercent(false)}>
                    #
                </button>
            </div>
        </div>
    )
}

export default MoveBox;