import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Other from './pages/Other';
import Resume from './pages/Resume';
import NavBar from './components/NavBar';

function App() {
  return (
    <div height="100%" width="100%">
      <NavBar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/other" element={<Other/>}/>
        <Route exact path="/resume" element={<Resume/>}/>
      </Routes>
    </div>
  );
}

export default App;
