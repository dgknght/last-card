import React, { Component } from 'react';

export default class PrepareGame extends Component {

  constructor(props) {
    super(props);

    this.handleJoin = this.handleJoin.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleStart() {
    fetch(`/api/games/${this.props.game._id}/start`, { method: 'PATCH' })
      .then(res => {
        if (res.status === 200)
          return res.json().then(this.props.onGameChange);
        return res.json().then(this.props.onError);
      })
      .catch(this.props.onError);
  }

  handleJoin() {
    fetch(`/api/games/${this.props.game._id}/join`, { method: 'PATCH' })
      .then(res => res.json())
      .then(this.props.onGameChange)
      .catch(this.props.onError);
  }
  
  shouldShowJoin() {
    return this.props.game.status === 'unstarted' &&
      !(this.props.game.players || []).find(p => p.name === this.props.user.name);
  }

  render() {
    if (this.props.game == null) {
      return null;
    }

    let joinButton = null;
    if (this.shouldShowJoin()) {
      joinButton = (
        <button className="btn btn-primary" onClick={this.handleJoin}>Join</button>
      );
    }

    let playerList;
    if (this.props.game.players) {
      playerList = (
        <ul className="list-group">
        {this.props.game.players.map(p => <li className="list-group-item" key={`player-${p.name}`}>{p.name}</li>)}
        </ul>
      );
    }

    return (
      <div>
        <h1>Prepare {this.props.game.name}</h1>
        <div className="row">
          <div className="col">
            <div>
              <h2>Players</h2>
              { playerList }
              { joinButton }
            </div>
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={this.handleStart}>Start</button>
          </div>
        </div>
      </div>
    );
  }
}
