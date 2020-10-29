import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FindGame from './components/find-game.component';
import PlayGame from './components/play-game.component';
import CreateGame from './components/create-game.component';
import SignIn from './components/sign-in.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.user = null;

    const cookies = new Cookies();
    if (cookies.get('user')) {
      this.user = { name: cookies.get('user') };
    }
  }

  nav() {
    if (this.user == null) {
      return (
        <nav className="nav">
          <NavLink to="/sign-in" className="nav-link text-light">Sign in</NavLink>
        </nav>
      );
    } else {
      return (
        <nav className="nav">
          <NavLink to="/games" className="nav-link text-light">Find a game</NavLink>
          <NavLink to="/create-game" className="nav-link text-light">Create a game</NavLink>
        </nav>
      );
    }
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <div className="navbar navbar-dark bg-dark">
              <div className="container">
                <a className="navbar-brand mr-md-auto" href="/">Last Card</a>
                {this.nav()}
              </div>
            </div>
          </header>
        </div>
        <div className="container mt-5">
          <Route path="/sign-in" component={SignIn} />
          <Route path="/create-game">
            <CreateGame user={this.user} />
          </Route>
          <Route path="/games" exact={true}>
            <FindGame user={this.user} />
          </Route>
          <Route
            path="/games/:id"
            exact={true}
            children={({ match }) => (<PlayGame match={match} user={this.user} />)}
            />
        </div>
      </Router>
    );
  }
}

export default App;
