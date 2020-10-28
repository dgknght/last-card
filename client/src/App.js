import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import FindGame from './components/find-game.component';
import PlayGame from './components/play-game.component';
import CreateGame from './components/create-game.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <div className="navbar navbar-dark bg-dark">
            <div className="container">
              <a className="navbar-brand mr-md-auto" href="/">Last Card</a>
              <nav className="nav">
                <NavLink to="/games" className="nav-link text-light">Find a game</NavLink>
                <NavLink to="/create-game" className="nav-link text-light">Create a game</NavLink>
              </nav>
            </div>
          </div>
        </header>
      </div>
      <div className="container mt-5">
        <Route path="/create-game" component={CreateGame} />
        <Route path="/games/:id" component={PlayGame} />
        <Route path="/games" exact component={FindGame} />
      </div>
    </Router>
  );
}

export default App;
