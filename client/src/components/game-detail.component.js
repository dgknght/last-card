import React, { Component } from 'react';
import PrepareGame from './prepare-game.component';
import PlayGame from './play-game.component';

export default class GameDetail extends Component {

  constructor(props) {
    super(props);

    this.id = props.match.params.id;
    this.user = props.user;
    this.state = { game: null }

    this.receiveGame = this.receiveGame.bind(this);
    this.handleGameChange = this.handleGameChange.bind(this);
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

  handleGameChange(game) {
    this.setState({ game });
  }

  render() {
    if (this.state.game === null)
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    switch (this.state.game.status) {
      case 'unstarted':
        return <PrepareGame game={this.state.game} user={this.user} onGameChange={this.handleGameChange} onError={this.props.onError} />
      case 'started':
        return <PlayGame game={this.state.game} user={this.user} onGameChange={this.handleGameChange} onError={this.props.onError} />
      default:
        return <div>Unknown game status {this.state.game.status}</div>
    }
  }
}
