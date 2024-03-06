import StatModifier from "./StatModifier";

function GameData(props){
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};

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
            {
                (Object.keys(statAbbrevs).slice(1)).map(
                    (statName) => <StatModifier 
                        statName={statName}
                        statChange={props.attackerStatChanges[statName]}
                        setStatChange={(statChange) => props.setStatChange(statName, statChange)}
                    />
                )
            }
        </div>
    );
}

export default GameData;