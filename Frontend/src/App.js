import logo from './logo.svg';
import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from "./components/Login.js"
import Dashboard from './components/Dashboard';

function App() {

  const [ user, setUser ] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <Route exact path='/'>
          {user === null ? <Redirect to='/dashboard'/> : <Login setUser={setUser}/>}
        </Route>
        <Route path='/dashboard'>
          <Dashboard user={user} />
        </Route>
      </div>
    </Router>
  );
}

export default App;
