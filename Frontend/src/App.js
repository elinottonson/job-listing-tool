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

  const [ darkTheme, setDarkTheme ] = React.useState(false);
  const [ user, setUser ] = React.useState([]);
  
  const history = useHistory();
  
  React.useEffect(() => {
    fetch('/auth')
      .then(res => res.json())
      .then((user) => setUser(user));
  }, []);

  React.useEffect(() => {
    let dt = window.localStorage.getItem('darkTheme') === 'true';
    setDarkTheme(dt);
    document.documentElement.setAttribute('dark-theme', dt ? 'true' : 'false');
  }, []);

  return (
    <Router history={history}>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            {Object.keys(user).length ? <Redirect to='/dashboard'/> : <Login setUser={setUser}/>}
          </Route>
          <Route path='/dashboard'>
            {
              !Object.keys(user).length ? 
                <Redirect to='/' /> : 
                <Dashboard user={user} setUser={setUser} darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
