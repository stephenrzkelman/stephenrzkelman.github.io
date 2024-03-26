import StatModifier from "./StatModifier";
import { useState } from 'react';

function GameData(props){
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};
    const [collapsed, setCollapsed] = useState(true);

    return(
        <div style={{width:"100%"}}>
            {
                collapsed &&
                <div className="single-row" style={{justifyContent:"space-between"}}>
                    {(Object.keys(statAbbrevs).slice(1)).map(
                        (statName) => <p>{`${statAbbrevs[statName]}: ${props.attackerStatChanges[statName]>=0?"+":""}${props.attackerStatChanges[statName]}`}</p>
                    )}
                    <button onClick={()=>setCollapsed(false)}>+</button>
                </div>
            }
            {
                !collapsed &&
                <div className="single-row" style={{justifyContent:"space-evenly"}}>
                    <div className="multi-row">
                        {(Object.keys(statAbbrevs).slice(1)).map(
                            (statName) => <StatModifier 
                                statName={statName}
                                statChange={props.attackerStatChanges[statName]}
                                setStatChange={(statChange) => props.setStatChange(statName, statChange)}
                            />
                        )}
                    </div>
                    <button onClick={()=>setCollapsed(true)}>-</button>                 
                </div>
            }
        </div>
    );
}

export default GameData;