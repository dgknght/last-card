const { Deck, unserializeDeck } = require('./deck');
const { unserializePlayer } = require('./player');

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

  serialize() {
    return {
      players: this._players.map(p => p.serialize()),
      deck: this._deck.serialize(),
      currentPlayerIndex: this._currentPlayerIndex
    };
  }
}

function unserializeGame(obj) {
  const players = obj.players.map(unserializePlayer);
  const deck = unserializeDeck(obj.deck);
  const game = new Game(players, deck);
  game._currentPlayerIndex = obj.currentPlayerIndex;
  return game;
}

module.exports = { Game, unserializeGame };
