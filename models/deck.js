const card = require('./card');

function createColorCards() {
  return card.COLORS.flatMap(color => {
    let result = card.COLORED_VALUES.slice(1).flatMap(value => {
      return [
        new card.Card(value, color),
        new card.Card(value, color)
      ];
    });
    result.push(new card.Card(0, color));
    return result;
  });
}

function createNonColorCards() {
  const result = [];
  for (let step = 0; step < 4; step++) {
    result.push(new card.Card('wild'));
    result.push(new card.Card('wildDrawFour'));
  };
  return result;
}

class Deck {
  constructor() {
    this._cards = createColorCards()
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
}

module.exports = Deck;
