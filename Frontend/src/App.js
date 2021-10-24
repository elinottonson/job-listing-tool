import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';

import './styles/App.css';

import Login from './components/Login.js';
import Dashboard from './components/Dashboard';

function App() {

  const [ user, setUser ] = React.useState({});

  const history = useHistory();

  return (
    <Router history={history}>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            {Object.keys(user).length ? <Redirect to='/dashboard'/> : <Login setUser={setUser}/>}
          </Route>
          <Route path='/dashboard'>
            {!Object.keys(user).length ? <Redirect to='/' /> : <Dashboard user={user} setUser={setUser} />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
