const Player = function(name) {
  this._hand = [];
  this._name = name;

  this.drawCard = function(card) {
    this._hand.push(card);
  };

  this.removeCard = function(card) {
    const index = this._hand.findIndex(c => c.equals(card));
    if (index == -1) return false;
    this._hand.splice(index, 1);
    return true;
  };

  this.getCardCount = function() {
    return this._hand.length;
  };

  this.getName = function() {
    return this._name;
  };

  // this.getNameX = () => this._name;
};

module.exports = Player;
