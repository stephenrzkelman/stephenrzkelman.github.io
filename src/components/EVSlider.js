import '../style/inputs.css'
import TextInput from './TextInput';

function EVSlider(props){
    /* TODO: generalize slider code */
    // trueStatValue, assuming level 100, neutral nature
    return(
        <div className="ev-slider">
            <p style={{width: "3rem"}}>
                {props.statName}
            </p>
            <TextInput
                value={props.evValue}
                onChange={props.setEvValue}
                width={2}
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
            <TextInput
                value={props.ivValue}
                onChange={props.setIvValue}
                width={2}
            />
        </div>
    )
    
}

export default EVSlider;
