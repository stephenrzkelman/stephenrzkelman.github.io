import logo from './logo.svg';
import CardBox from './components/CardBox.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <CardBox cards={[1,1,1]}/>
    </div>
  );
}

export default App;
