const { Deck, unserializeDeck } = require('./deck');
const { unserializePlayer } = require('./player');
const { unserializeCard } = require('./card');

class Game {
  constructor(players, deck) {
    this._status = 'unstarted';
    this._name = '';
    this._players = players || [];
    this._currentPlayerIndex = 0;
    this._deck = deck || new Deck();
    this._discardPile = [];
  }

  start() {
    if (this._status != 'unstarted') {
      throw new Error('Cannot start a game that is already started.');
    }

    this._deck.shuffle();
    for (let step = 0; step < 7; step++) {
      this._players.forEach(p => p.drawCard(this._deck.deal()));
    };
    this._discardPile.push(this._deck.deal());
    this._status = 'started';
    return this;
  }

  getStatus() {
    return this._status;
  }

  addPlayer(player) {
    if (this._status !== 'unstarted') {
      throw new Error('Cannot add players to a game that is already started.');
    }
    this._players.push(player);
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
      name: this._name,
      status: this._status,
      players: this._players.map(p => p.serialize()),
      deck: this._deck.serialize(),
      currentPlayerIndex: this._currentPlayerIndex,
      discardPile: this._discardPile.map(c => c.serialize())
    };
  }
}

function unserializeGame(obj) {
  const game = new Game();

  if (typeof obj.players !== 'undefined')
    game._players = obj.players.map(unserializePlayer);

  if (typeof obj.deck !== 'undefined')
    game._deck = unserializeDeck(obj.deck);

  if (typeof obj.discardPile !== 'undefined')
    game._discardPile = obj.discardPile.map(unserializeCard);
  else
    game._discardPile = [];

  game._currentPlayerIndex = obj.currentPlayerIndex || 0;
  game._id = obj._id;
  game._status = obj.status;
  game._name = obj.name;

  return game;
}

module.exports = { Game, unserializeGame };
