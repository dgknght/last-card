const expect = require('chai').expect;
const Deck = require('../models/deck');

describe('Deck', () => {
  it('has 108 cards', () => {
    const deck = new Deck();
    expect(deck.getCardCount()).to.equal(108);
  });
});
