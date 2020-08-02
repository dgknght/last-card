const Player = function() {
  this._hand = [];

  this.drawCard = function(card) {
    this._hand.push(card);
  };

  this.removeCard = function(card) {
    this._hand = this._hand.filter(c => !c.equals(card));
  };

  this.getCardCount = function() {
    return this._hand.length;
  };
};

module.exports = Player;
