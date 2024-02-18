// import logo from './logo.svg';
import Duel from './components/pokemon/Duel.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Damage Calculator Coming Soon!</h1>
      {/* <CardBox cards={[1,1]}/> */}
      <Duel/>
      <div style={{textAlign:"left"}}>
        <p>Source Code:</p>
        <ul>
          <li><a href="https://github.com/stephenrzkelman/pokemondb-scraper">pokemondb.net web scraper</a></li>
          <li><a href="https://github.com/stephenrzkelman/stephenrzkelman.github.io">code for this page</a></li>
        </ul>
      </div>
    </div>
  );
}

export default App;
