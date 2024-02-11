// import Card from './Card';
import PokemonCard from '../pokemon/PokemonCard';

function CardBox(props) {
    
    return(
        <div className="card-box">
            {props.cards.map((_) => <PokemonCard/>)}
        </div>
    );
}

export default CardBox;