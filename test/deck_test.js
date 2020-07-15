const expect = require('chai').expect;
const Deck = require('../models/deck');

describe('Deck', () => {
  it('has 108 cards', () => {
    const deck = new Deck();
    expect(deck.getCardCount()).to.equal(108);
  });

  // it has 4 cards with value 0
  // it has 8 cards with value 1
  // it has 8 cards with value 2
  // ...
  // it has 8 cards with value 'skip'
  // it has 8 cards with value '+2'
  // it has 8 cards with value 'reverse'
  // it has four cards with value 'wild' and no color
  // it has four cards with value '+4' and no color
  //
  // it has 25 cards with color 'blue'
  // it has 25 cards with color 'red'
  // it has 25 cards with color 'green'
  // it has 25 cards with color 'yellow'
  // it has 8 cards with no color
  //
  // the deck can be shuffled
});
