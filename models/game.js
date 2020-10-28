const Deck = require('./deck');

class Game {
  constructor(players, deck) {
    this._players = players;
    this._currentPlayerIndex = 0;
    this._deck = deck || new Deck();
    this._discardPile = [];
  }

  start() {
    this._deck.shuffle();
    for (let step = 0; step < 7; step++) {
      this._players.forEach(p => p.drawCard(this._deck.deal()));
    };
    this._discardPile.push(this._deck.deal());
  }

  getPlayers() {
    return this._players;
  }

  getCurrentPlayer() {
    return this._players[this._currentPlayerIndex];
  }

  getDiscardPile() {
    return this._discardPile;
  }

  getDeck() {
    return this._deck;
  }

  playCard(card) {
    if (this.getCurrentPlayer().removeCard(card)) {
      this._discardPile.push(card);
      this._currentPlayerIndex++;
    } else {
      throw new Error('invalid card');
    }
  }

  getTopDiscard() {
    return this._discardPile[this._discardPile.length - 1];
  }
}

module.exports = Game;
