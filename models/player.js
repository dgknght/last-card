const Player = function() {
  this._hand = [];

  this.drawCard = function(card) {
    this._hand.push(card);
  };

  this.getCardCount = function() {
    return this._hand.length;
  };
};

module.exports = Player;
