import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import FindGame from './components/find-game.component';
import PlayGame from './components/play-game.component';
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
                <Link to="/games" className="nav-link text-light">Find a game</Link>
              </nav>
            </div>
          </div>
        </header>
      </div>
      <div className="container mt-5">
        <Route path="/games" exact component={FindGame} />
        <Route path="/games/:id" component={PlayGame} />
      </div>
    </Router>
  );
}

export default App;
