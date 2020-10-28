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
}

module.exports = Player;
