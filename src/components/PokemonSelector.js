import {useState} from "react";
import PokemonDropdown from "./PokemonDropdown.js"

function PokemonSelector(props){
    const [selecting, setSelecting] = useState(false);
    return(
        <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"stretch"}}>
            <input 
                type = "text"
                className = "text-input"
                value={props.pokemon}
                onClick={() => setSelecting(!selecting)}
                onChange={
                    (e)=> {
                        props.setPokemon(e.target.value)
                    }
                }
            />
            {selecting && <PokemonDropdown setPokemon={props.setPokemon} setSelecting={setSelecting}/>}
        </div>
    );
}

export default PokemonSelector;