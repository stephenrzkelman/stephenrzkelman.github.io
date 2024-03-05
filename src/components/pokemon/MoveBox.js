import allMoves from '../../resources/moves.json';
import { useState, useEffect } from 'react';
import SearchableDropdown from '../generic/SearchableDropdown';
import StatModifier from './StatModifier';
import typeChart from '../../resources/typechart.json';

function MoveBox(props) {
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [move, setMove] = useState("Flail");
    const [damage, setDamage] = useState([0,0]);

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
        let attackerModifiedStat;
        let defenderStat;
        let defenderModifiedStat;
        if(moveCat === "Special"){
            attackerStat = Number(props.attackerStats["Sp. Atk"]);
            attackerModifiedStat = attackerStat * statModifierCalc(props.attackerStatChanges["Sp. Atk"]);
            defenderStat = Number(props.defenderStats["Sp. Def"]);
            defenderModifiedStat = defenderStat * statModifierCalc(props.defenderStatChanges["Sp. Def"]);
        }
        else if(moveCat === "Physical"){
            attackerStat = Number(props.attackerStats["Attack"]);
            attackerModifiedStat = attackerStat * statModifierCalc(props.attackerStatChanges["Attack"]);
            defenderStat = Number(props.defenderStats["Defense"]);
            defenderModifiedStat = defenderStat * statModifierCalc(props.defenderStatChanges["Defense"]);
        }
        else{
            return 0;
        }
        let levelMultiplier = Math.floor(2 * (props.level) / 5) + 2;
        let baseMultiplier = Math.floor((levelMultiplier * movePower * attackerModifiedStat / defenderModifiedStat)/50) + 2;
        let critMultiplier = Math.floor((levelMultiplier * movePower * attackerStat / defenderStat)/50) + 2;

        let sameTypeAttackBonus = props.attackerType.includes(moveType) ? 1.5 : 1;
        let typeEffectiveness = props.defenderType.reduce(
            (multiplier, type) => multiplier * typeChart[`${moveType}->${type}`],
            1
        );

        let highDamage = Math.floor(baseMultiplier * sameTypeAttackBonus * typeEffectiveness);
        let lowDamage = Math.floor(0.85 * highDamage);
        let critDamage = Math.floor(baseMultiplier * sameTypeAttackBonus * typeEffectiveness * 1.5);

        setDamage([lowDamage, highDamage, critDamage]);
    }

    useEffect(()=>damageCalc());
    return(
        <div
            style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"baseline",
                width:"100%"
            }}
        >
            {
                (Object.keys(statAbbrevs)).map(
                    (statName) => <StatModifier 
                        statName={statName}
                        statChange={props.attackerStatChanges[statName]}
                        setStatChange={(statChange) => props.setStatChange(statName, statChange)}
                    />
                )
            }
            <div style={{height:"1rem"}}/>
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
                        width:"20rem",
                        textAlign:"right"
                    }}
                >Damage: {damage[0]} - {damage[1]}
                </p>
            </div>
        </div>
    )
}

export default MoveBox;