const Deck = require('./deck');

const Game = function(players, deck) {

  this._players = players;
  this._currentPlayerIndex = 0;
  this._deck = deck || new Deck();
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

  this.getCurrentPlayer = function() {
    return this._players[this._currentPlayerIndex];
  };

  this.getDiscardPile = function() {
    return this._discardPile;
  };

  this.getDeck = function() {
    return this._deck;
  };

  this.playCard = function(card) {
    this._discardPile.push(card);
    this.getCurrentPlayer().removeCard(card);
    this._currentPlayerIndex++;
  };

  this.getTopDiscard = function() {
    return this._discardPile[this._discardPile.length - 1];
  };
};

module.exports = Game;
