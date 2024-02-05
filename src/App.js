// import logo from './logo.svg';
import CardBox from './components/generic/CardBox.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Damage Calculator Coming Soon!</h1>
      {<CardBox cards={[1,1]}/>}
    </div>
  );
}

export default App;
