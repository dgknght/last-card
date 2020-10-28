const { unserializeCard } = require('./card');

class Player {
  constructor(name) {
    this._hand = [];
    this._name = name;
  }

  drawCard(card) {
    this._hand.push(card);
  }

  removeCard(card) {
    const index = this._hand.findIndex(c => c.equals(card));
    if (index == -1) return false;
    this._hand.splice(index, 1);
    return true;
  }

  getCardCount() {
    return this._hand.length;
  }

  getName() {
    return this._name;
  }

  getHand() {
    return this._hand;
  }

  serialize() {
    return {
      name: this._name,
      hand: this._hand.map(c => c.serialize())
    };
  }
}

function unserializePlayer(obj) {
  const player = new Player(obj.name);
  if (typeof obj.hand != 'undefined') {
    player._hand = obj.hand.map(unserializeCard);
  }
  return player;
}

module.exports = { Player, unserializePlayer };
