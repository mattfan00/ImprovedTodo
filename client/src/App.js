import React from 'react';
import './App.css';
import Lists from './Components/Lists/Lists'
import Login from './Components/Index/Login'

import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Lists />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
