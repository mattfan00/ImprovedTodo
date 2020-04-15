import React from 'react';
import './App.css';
import Lists from './Components/Lists/Lists'
import LoginPage from './Components/Index/LoginPage'

import { 
  BrowserRouter as Router, 
  Switch, 
  Route 
} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
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
