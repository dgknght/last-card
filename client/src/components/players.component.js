import React, { Component } from 'react';

export default class Players extends Component {
  constructor(props) {
    super(props);

    this.playerElem = this.playerElem.bind(this);
  }

  playerElem(player, index) {
    let className = 'card-player';
    if (index === this.props.game.currentPlayerIndex)
      className = className + ' active';
    return <div key={`player-${player.name}`} className={ className }>{ player.name }</div>;
  }

  render() {
    return (
      <div className="d-flex flex-column">
        { this.props.game.players.map(this.playerElem) }
      </div>
    );
  }
}
