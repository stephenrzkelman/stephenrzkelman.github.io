import '../style/inputs.css'

function EVSlider(props){
    /* TODO: generalize slider code */
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
        </div>
    )
    
}

export default EVSlider;