import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Other from './pages/Other';
import NavBar from './components/NavBar';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/other" element={<Other/>}/>
      </Routes>
    </div>
  );
}

export default App;
