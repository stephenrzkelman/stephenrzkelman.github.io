import '../style/inputs.css'

function TextInput(props){
    return(
        <input 
            type = "text"
            className = "text-input"
            value={props.value}
            onChange={(e)=> props.onChange(e.target.value)}
            style={{width:`${props.width}rem`}}
        />
    );
}

export default TextInput;