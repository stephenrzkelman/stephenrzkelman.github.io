// import logo from './logo.svg';
import CardBox from './components/generic/CardBox.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Damage Calculator Coming Soon!</h1>
      {<CardBox cards={[1,1]}/>}
      <div style={{textAlign:"left"}}>
        <h2>Known Issues/WIP:</h2>
        <ul>
          <li>Working on adding sliders for all EV's</li>
          <ul>
            <li>Base stat display will be combined with stat sliders, similar to EV/IV mgmt on showdown teambuilder</li>
          </ul>
          <li>Working on allowing text input for dropdown, to make it searchable</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
