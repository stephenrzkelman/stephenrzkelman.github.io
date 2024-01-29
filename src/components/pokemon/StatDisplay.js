import Stat from './Stat.js';

const statNames = [
    "HP", 
    "Attack",
    "Defense",
    "Sp. Atk",
    "Sp. Def",
    "Speed"
]

function StatDisplay(props){
    return(
        <div className="stat-box">
            {statNames.map(
                (statName) => <Stat statName={statName} statValue={props.statCalc(statName)}/>
            )}
        </div>
    );
}

export default StatDisplay;