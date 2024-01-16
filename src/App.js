import logo from './logo.svg';
import CardBox from './components/CardBox.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Damage Calculator Coming Soon!</h1>
      <CardBox cards={[1,1,1]}/>
      <div style={{textAlign:"left"}}>
        <h2>Known Issues/WIP:</h2>
        <ul>
          <li>Some pokemon in dropdown cause page to crash when selected (fix by reloading page). Fixes in progress:</li>
          <ol>
            <li>Make sure web scraper picks up images for all variants (i.e. megas, etc)</li>
            <li>Give cards a way to deal with an image not being found (i.e. '?' figure on showdown)</li>
          </ol>
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
