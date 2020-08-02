const expect = require('chai').expect;
const Card = require('../models/card').Card;

describe('Card', () => {
  describe('.getValue()', () => {
    // 0-9, +2, +4, wild, skip, reverse
    [0, 1, 2, 3, 'drawTwo'].forEach(v => {
      it(`can be ${v}`, () => {
        const card = new Card(v);
        expect(card.getValue()).to.equal(v);
      });
    });

    [10, "+3"].forEach(v => {
      it(`cannot be ${v}`, () => {
        expect(() => {
          const card = new Card(v);
        }).to.throw(Error, 'value must be 0-9, "drawTwo", "wildDrawFour", "wild", "skip", or "reverse"');
      });
    });
  });

  describe('.getColor()', () => {
    // red, blue, yellow, green
    it('can be "blue"', () => {
      const card = new Card(0, "blue");
      expect(card.getColor()).to.equal("blue");
    });
  });

  describe('.equals(card)', () => {
    it('returns true if both cards have the same value and color', () => {
      const c1 = new Card(0, 'blue');
      const c2 = new Card(0, 'blue');
      expect(c1.equals(c2)).to.be.true;
    });

    it('returns false if both cards have different values', () => {
      const c1 = new Card(0, 'blue');
      const c2 = new Card(1, 'blue');
      expect(c1.equals(c2)).to.be.false;
    });

    it('returns false if both cards have different colors', () => {
      const c1 = new Card(0, 'blue');
      const c2 = new Card(0, 'red');
      expect(c1.equals(c2)).to.be.false;
    });

    it('returns false if the arguement is not a card', () => {
      const c1 = new Card(0, 'blue');
      const c2 = new Object();
      expect(c1.equals(c2)).to.be.false;
    });
  });

  // when value is 0, color is required
  // when value is 1, color is required
  // ...
  // when value is 'wild', color is ignored
  // when value is '+4', color is ignored
});
