import {createElement} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import { allPages } from './util';

function App() {

  return (
    <div height="100%" width="100%">
      <NavBar/>
      <Routes>
        {
          allPages().map(
            ([pageName, pageComponent]) => {
              console.log(`page name: ${pageName}`);
              return <Route
                exact path={pageName.substring(1).toLowerCase()}
                element={createElement(pageComponent)}
              />;
            }
          )
        }
      </Routes>
    </div>
  );
}

export default App;
