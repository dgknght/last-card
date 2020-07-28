const expect = require('chai').expect;
const Player = require('../models/player');
const Deck = require('../models/deck');

describe('Player', () => {
  describe('.drawCard(card)', () => {
    const deck = new Deck();
    const player = new Player();
    it("increases amount of cards in the player's hand", () => {
      player.drawCard(deck.deal());
      expect(player.getCardCount()).to.equal(1);
    });
  });
});
