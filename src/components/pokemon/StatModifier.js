import { useState } from 'react';
import '../../style/inputs.css';
import '../../style/misc.css';

function StatModifier(props){
    const [statChangeArray, setStatChangeArray] = useState(Array(6).fill(1));
    let statChangeSymbols = [ <p style={{width:"1rem"}}>&#9660;</p>, <p style={{width:"1rem"}}>&#9679;</p>, <p style={{width:"1rem"}}>&#9650;</p>];

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
        if(props.statChange >= +6){
            return;
        }
        let indexToChange = props.statChange >= 0 ? props.statChange : Math.abs(props.statChange + 1);
        updateStatChangeArray(indexToChange, +1)
        props.setStatChange(props.statChange + 1);
    }

    function statDrop(){
        if(props.statChange <= -6){
            return;
        }
        let indexToChange = props.statChange <= 0 ? Math.abs(props.statChange) : props.statChange - 1;
        updateStatChangeArray(indexToChange, -1);
        props.setStatChange(Math.max(-6, props.statChange - 1));
    }

    return(
    <div className="stat-modifier">
        <p style={{textAlign:"left", width:"4rem"}}>{props.statName}</p>
        {/* minus button */}
        <button 
            className="btn"
            onClick={statDrop}
        >
            -
        </button>
        <p style={{textAlign:"center", width:"2rem"}}>{props.statChange}</p>
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