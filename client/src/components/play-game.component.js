import React, { Component } from 'react';
import Players from './players.component';
import Card from './card.component';

export default class GameDetail extends Component {
  discardElem() {
    if (this.props.game.discardPile && this.props.game.discardPile.length !== 0)
      return <Card card={this.props.game.discardPile[0]} />;
    return <Card />
  }

  playerHand() {
    const player = this.props.game.players.find(p => p.name === this.props.user.name);
    return (
      <div className="d-flex flex-wrap">
        { player.hand.map(c => <Card key={`player-card-${c.color}-${c.value}`} card={c} />) }
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>{this.props.game.name}</h1>
        <div className="table-top">
          <div className="row">
            <div className="col">
              <Players />
            </div>
            <div className="col">
              <div className="d-flex">
                {this.discardElem()}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              {this.playerHand()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
