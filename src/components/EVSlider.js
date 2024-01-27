import '../style/inputs.css'

function EVSlider(props){
    /* TODO: generalize slider code */
    // trueStatValue, assuming level 100, neutral nature
    function trueStatValue(){
        if (props.statName === "HP"){
            let multiplier = 2 * Number(props.base) + Number(props.ivValue) + Math.floor(Number(props.evValue)/4);
            return Math.floor(multiplier * level / 100) + level + 10;
        }
        else{
            let multiplier = 2 * Number(props.base) + Number(props.ivValue) + Math.floor(Number(props.evValue)/4);
            return  Math.floor(multiplier * level / 100) + 5;
        }
    }
    return(
        <div className="ev-slider">
            <p style={{width: "3rem"}}>
                {props.statName}
            </p>
            <input 
                type = "text"
                className = "text-input"
                value={props.evValue}
                onChange={(e)=> props.setEvValue(e.target.value)}
                style={{width:"2rem"}}
            />
            {/* TODO:  robust validation for text input */}
            <input 
                type="range"
                min="0"
                max="252"
                step="4"
                className = "slider"
                value={props.evValue}
                onChange={(e)=> props.setEvValue(e.target.value)}
            />
            <input 
                type = "text"
                className = "text-input"
                value={props.ivValue}
                onChange={(e)=> props.setIvValue(e.target.value)}
                style={{width:"2rem"}}
            />
            <p style={{width: "3rem"}}>
                {trueStatValue()}
            </p>
        </div>
    )
    
}

export default EVSlider;
