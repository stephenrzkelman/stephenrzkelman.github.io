import '../../style/inputs.css'
import Stat from './Stat';
import TextInput from '../generic/TextInput';

function EVSlider(props){
    const statAbbrevs = {"HP":"HP", "Attack":"Atk", "Defense":"Def", "Sp. Atk": "SpA", "Sp. Def": "SpD", "Speed": "Spe"};

    return(
        <div className="ev-slider">
            <p style={{width: "3rem"}}>
                {statAbbrevs[props.statName]}
            </p>
            <TextInput
                value={props.evValue}
                onChange={(newValue)=>{
                    console.log("Text changed!");
                    newValue = Number(newValue.replace(/\D/g,''));
                    props.setEvValue(newValue);
                }}
                width={2}
            />
            {/* TODO:  robust validation for text input */}
            <input 
                type="range"
                min={0}
                max={252}
                step={4}
                className = "slider"
                value={props.evValue}
                onChange={(e)=> {
                    console.log("Changed!");
                    props.setEvValue(Number(e.target.value));
                }}
            />
            <TextInput
                value={props.ivValue}
                onChange={(newValue)=>{
                    newValue = Number(newValue.replace(/\D/g,''));
                    props.setIvValue(newValue);
                }}
                width={2}
            />
            <Stat statValue={props.statValue}/>
        </div>
    )
    
}

export default EVSlider;
