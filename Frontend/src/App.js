import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";

import Login from "./components/Login.js"
import Dashboard from './components/Dashboard';

function App() {

  const [ user, setUser ] = React.useState({});

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            {Object.keys(user).length ? <Redirect to='/dashboard'/> : <Login setUser={setUser}/>}
          </Route>
          <Route path='/dashboard'>
            {user === null ? <Redirect to='/' /> : <Dashboard user={user} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
