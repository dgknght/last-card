const Deck = require('./deck');

const Game = function(players) {

  this._players = players;
  this._deck = new Deck();
  this._discardPile = [];

  this.start = function() {
    this._deck.shuffle();
    for (let step = 0; step < 7; step++) {
      this._players.forEach(p => p.drawCard(this._deck.deal()));
    };
    this._discardPile.push(this._deck.deal());
  };

  this.getPlayers = function() {
    return this._players;
  };

  this.getDiscardPile = function() {
    return this._discardPile;
  };

  this.getDeck = function() {
    return this._deck;
  };
};

module.exports = Game;
