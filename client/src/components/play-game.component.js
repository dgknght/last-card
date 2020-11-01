import React, { Component } from 'react';
import Players from './players.component';
import Card from './card.component';

export default class GameDetail extends Component {
  constructor(props) {
    super(props);

    this.playCard = this.playCard.bind(this);
  }

  discardElem() {
    if (this.props.game.discardPile && this.props.game.discardPile.length !== 0)
      return <Card card={this.props.game.discardPile[this.props.game.discardPile.length - 1]} />;
    return <Card />
  }

  playCard(card) {
    fetch(
      `/api/games/${this.props.game._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      }
    )
    .then(res => res.json())
    .then(this.props.onGameChange)
    .catch(this.props.onError)
  }

  playerHand() {
    const player = this.props.game.players.find(p => p.name === this.props.user.name);
    return (
      <div className="d-flex flex-wrap">
        { player.hand.map(c => <Card onPlay={this.playCard} key={`player-card-${c.color}-${c.value}`} card={c} />) }
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
              <Players game={this.props.game} />
            </div>
            <div className="col">
              <div className="d-flex justify-content-around">
                {this.discardElem()}
                <Card /> {/* This face-down card represents the deck from which additional cards may be drawn */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <hr />
              {this.playerHand()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
