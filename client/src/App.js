import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import FindGame from './components/find-game.component';
import GameDetail from './components/game-detail.component';
import CreateGame from './components/create-game.component';
import SignIn from './components/sign-in.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor() {
    super();

    let user = null;
    const cookies = new Cookies();
    if (cookies.get('user')) {
      user = { name: cookies.get('user') };
    }

    this.state = { user: user, error: null }
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleError = this.handleError.bind(this);
    this.clearError = this.clearError.bind(this);
  }

  handleUserChange(user) {
    this.setState({ user });
  }

  handleError(error) {
    if (typeof error === 'string') {
      this.setState({ error });
    } else if (typeof error.error === 'string') {
      this.setState({ error: error.error });
    } else if (typeof error.message === 'string') {
      this.setState({ error: error.message });
    }
  }

  clearError() {
    this.setState({ error: null });
  }

  nav() {
    if (this.state.user == null) {
      return (
        <nav className="nav">
          <NavLink to="/sign-in" onUserChange={this.handleUserChange} className="nav-link text-light">Sign in</NavLink>
        </nav>
      );
    }
    return (
      <nav className="nav">
        <NavLink to="/games" className="nav-link text-light">Find a game</NavLink>
        <NavLink to="/create-game" className="nav-link text-light">Create a game</NavLink>
      </nav>
    );
  }

  render() {
    let alertDiv = null;
    if (this.state.error) {
      alertDiv = (
        <div className="alert alert-danger">
          { this.state.error }
          <button onClick={this.clearError} type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
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
          { alertDiv }
          <Route path="/sign-in" component={SignIn} />
          <Route path="/create-game">
            <CreateGame user={this.state.user} />
          </Route>
          <Route path="/games" exact={true}>
            <FindGame user={this.state.user} />
          </Route>
          <Route path="/games/:id" render={({ match }) => <GameDetail match={match} user={this.state.user} onError={this.handleError} />} />
        </div>
      </Router>
    );
  }
}

export default App;
