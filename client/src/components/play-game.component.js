import React, { Component } from 'react';

export default class PlayGame extends Component {

  constructor(props) {
    super(props);
    this.id = props.match.params.id;
    this.user = props.user;
    this.state = { game: null }

    this.handleJoin = this.handleJoin.bind(this);
    this.receiveGame = this.receiveGame.bind(this);
  }

  componentDidMount() {
    fetch(`/api/games/${this.id}`)
      .then(this.receiveGame);
  }

  receiveGame(res) {
    if (res.status === 200) {
      res.json().then(game => this.setState({ game }));
    } else {
      res.json().then(({ error }) => this.setState({ error: error }));
    }
  }

  handleJoin() {
    fetch(`/api/games/${this.id}/join`, { method: 'PATCH' })
      .then(this.receiveGame)
      .catch(error => this.setState({ error }));
  }
  
  shouldShowJoin() {
    return this.state.game.status === 'unstarted' &&
      !(this.state.game.players || []).find(p => p.name === this.user.name);
  }

  render() {
    if (this.state.game == null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    if (this.state.error != null) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      )
    }

    if (this.shouldShowJoin()) {
      return (
        <div>
          <h1>Play game {this.state.game.name}</h1>
          <button className="btn btn-primary" onClick={this.handleJoin}>Join</button>
        </div>
      );
    }

    return (
      <div>
        <h1>Play game {this.state.game.name}</h1>
        <ul>
          {this.state.game.players.map(p => <li key={`player-${p.name}`}>{p.name}</li>)}
        </ul>
      </div>
    );
  }
}
