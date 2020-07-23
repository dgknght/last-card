const expect = require('chai').expect;
const Deck = require('../models/deck');

describe('Deck', () => {
  it('has 108 cards', () => {
    const deck = new Deck();
    expect(deck.getCardCount()).to.equal(108);
  });

  function testValueCount(value, expectedCount) {
    const deck = new Deck();
    const cards = deck.getCards().filter(card => {
      return card.getValue() == value;
    });
    expect(cards.length).to.equal(expectedCount);
  };

  it('has 4 cards with the value 0', () => {
    testValueCount(0, 4);
  });

  it('has 8 cards with the value 1', () => {
    testValueCount(1, 8);
  });

  it('has 8 cards with the value 2', () => {
    testValueCount(2, 8);
  });

  it('has 8 cards with the value 3', () => {
    testValueCount(3, 8);
  });

  it('has 8 cards with the value 4', () => {
    testValueCount(4, 8);
  });

  it('has 8 cards with the value 5', () => {
    testValueCount(5, 8);
  });

  it('has 8 cards with the value 6', () => {
    testValueCount(6, 8);
  });

  it('has 8 cards with the value 7', () => {
    testValueCount(7, 8);
  });

  it('has 8 cards with the value 8', () => {
    testValueCount(8, 8);
  });

  it('has 8 cards with the value 9', () => {
    testValueCount(9, 8);
  });

  it('has 8 cards with the value drawTwo', () => {
    testValueCount('drawTwo', 8);
  });

  it('has 8 cards with the value skip', () => {
    testValueCount('skip', 8);
  });

  it('has 8 cards with the value reverse', () => {
    testValueCount('reverse', 8);
  });

  it('has 4 cards with the value wild', () => {
    testValueCount('wild', 4);
  });

  it('has 4 cards with the value wildDrawFour', () => {
    testValueCount('wildDrawFour', 4);
  });

  function testColorCount(color, expectedCount) {
    const deck = new Deck();
    const cards = deck.getCards().filter(card => {
      return card.getColor() == color;
    });
    expect(cards.length).to.equal(expectedCount);
  };

  it('has 25 cards with the color blue', () => {
    testColorCount('blue', 25);
  });

  it('has 25 cards with the color red', () => {
    testColorCount('red', 25);
  });

  it('has 25 cards with the color yellow', () => {
    testColorCount('yellow', 25);
  });

  it('has 25 cards with the color green', () => {
    testColorCount('green', 25);
  });

  it('has 8 cards with the no color', () => {
    testColorCount(null, 8);
  });

  function deckToString(deck) {
    return deck.getCards()
      .map(c => `${c.getValue()}:${c.getColor()}`)
      .join(',');
  }

  function areEqual(deck1, deck2) {
    return deckToString(deck1) === deckToString(deck2);
  }

  describe('.shuffle', () => {
    it("doesn't yield the same sequence of cards twice", () => {
      const deck1 = new Deck();
      const deck2 = new Deck();
      deck1.shuffle();
      deck2.shuffle();
      expect(deckToString(deck1)).to.not.equal(deckToString(deck2));
    });
  });

  describe('.deal()', () => {
    it('returns a card', () => {
      const deck = new Deck();
      const card = deck.deal();
      expect(card.getValue).to.be.a('function');
    });
    it('has one fewer card after dealing', () => {
      const deck = new Deck();
      const card = deck.deal();
      expect(deck.getCardCount()).to.equal(107);
    });
  });

});
