import '../../style/inputs.css'
import Stat from './Stat';
import TextInput from '../generic/TextInput';

function EVSlider(props){
    return(
        <div className="ev-slider">
            <p style={{width: "3rem"}}>
                {props.statName}
            </p>
            <TextInput
                value={props.evValue}
                onChange={(newValue)=>{
                    newValue = newValue.replace(/\D/g,'');
                    newValue = Math.max(0,Math.min(252, newValue));
                    props.setEvValue(newValue);
                }}
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
                onChange={(newValue)=>{
                    newValue = newValue.replace(/\D/g,'');
                    newValue = Math.max(0,Math.min(31, newValue));
                    props.setIvValue(newValue);
                }}
                width={2}
            />
            <Stat statValue={props.statValue}/>
        </div>
    )
    
}

export default EVSlider;
