const expect = require('chai').expect;
const Card = require('../models/card');

console.log(Card);

describe('Card', () => {
  describe('.getValue()', () => {
    // 0-9, +2, +4, wild, skip, reverse
    [0, 1, 2, 3, "+2"].forEach(v => {
      it(`can be ${v}`, () => {
        const card = new Card(v);
        expect(card.getValue()).to.equal(v);
      });
    });

    [10, "+3"].forEach(v => {
      it(`cannot be ${v}`, () => {
        expect(() => {
          const card = new Card(v);
        }).to.throw(Error, 'value must be 0-9, "+2", "+4", "wild", "skip", or "reverse"');
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
});

