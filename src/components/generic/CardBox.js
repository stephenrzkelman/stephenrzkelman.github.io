// import Card from './Card';
import PokemonCard from '../pokemon/PokemonCard';

function CardBox(props) {
    
    return(
        <div className="card-box">
            {props.cards.map((_) => <PokemonCard/>)}
            {/* TODO: Add way to limit # of cards per line, etc.*/}
        </div>
    );
}

export default CardBox;