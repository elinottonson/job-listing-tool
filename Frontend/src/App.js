import logo from './logo.svg';
import './App.css';

import Login from "./components/Login.js"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/>
        <br/>
        <button>Submit</button>
      </header>
    </div>
  );
}

export default App;
