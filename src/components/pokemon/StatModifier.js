import { useState } from 'react';
import '../../style/inputs.css';
import '../../style/misc.css';

function StatModifier(props){
    const [statChange, setStatChange] = useState(0);
    const [statChangeArray, setStatChangeArray] = useState(Array(6).fill(1));
    let statChangeSymbols = [ <p>&#9660;</p>, <p>&#9679;</p>, <p>&#9650;</p>];

    function updateStatChangeArray(targetIndex, adjustment){
        setStatChangeArray(statChangeArray.map((value, index)=>{
            if(index === targetIndex){
                return value + adjustment;
            }
            else{
                return value;
            }
        }))
    }

    function statBoost(){
        if(statChange >= +6){
            return;
        }
        let indexToChange = statChange >= 0 ? statChange : Math.abs(statChange + 1);
        updateStatChangeArray(indexToChange, +1)
        setStatChange(statChange + 1);
    }

    function statDrop(){
        if(statChange <= -6){
            return;
        }
        let indexToChange = statChange <= 0 ? Math.abs(statChange) : statChange - 1;
        updateStatChangeArray(indexToChange, -1);
        setStatChange(Math.max(-6, statChange - 1));
    }

    return(
    <div className="stat-modifier">
        {props.statName}
        {/* minus button */}
        <button 
            className="btn"
            onClick={statDrop}
        >
            -
        </button>
        {statChange}
        {statChangeArray.map((index)=>statChangeSymbols[index])}
        <button
            className="btn"
            onClick={statBoost}
        >
            +
        </button>
    </div>
    );
}

export default StatModifier;