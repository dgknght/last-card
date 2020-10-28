const { Card, unserializeCard, COLORS, COLORED_VALUES } = require('./card');

function createColorCards() {
  return COLORS.flatMap(color => {
    let result = COLORED_VALUES.slice(1).flatMap(value => {
      return [
        new Card(value, color),
        new Card(value, color)
      ];
    });
    result.push(new Card(0, color));
    return result;
  });
}

function createNonColorCards() {
  const result = [];
  for (let step = 0; step < 4; step++) {
    result.push(new Card('wild'));
    result.push(new Card('wildDrawFour'));
  };
  return result;
}

class Deck {
  constructor(cards) {
    this._cards = cards || createColorCards()
      .concat(createNonColorCards());
  }

  getCardCount() {
    return this._cards.length;
  }

  getCards() {
    return this._cards;
  }

  shuffle() {
    this._cards.sort(() => Math.random() - 0.5);
  }

  deal() {
    const card = this._cards.shift();
    return card;
  }

  serialize() {
    return { cards: this._cards.map(c => c.serialize()) };
  };
}

function unserializeDeck(obj) {
  const deck = new Deck();
  deck._cards = obj.cards.map(unserializeCard);
  return deck;
}

module.exports = { Deck, unserializeDeck };
