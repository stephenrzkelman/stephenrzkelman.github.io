import allMons from '../resources/pokemon.json';


function PokemonDropdown(props){
    return(
        <div className="dropdown">
            {Object.keys(allMons).map(
                (pokemonName) => <div
                onClick={()=>{
                    props.setPokemon(pokemonName);
                    props.setSelecting();
                }}
                >
                    {pokemonName}
                </div>
            )}
        </div>
    );
}

export default PokemonDropdown;