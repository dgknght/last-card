const expect = require('chai').expect;
const { Player, unserializePlayer } = require('../models/player');
const { Deck } = require('../models/deck');
const { Card } = require('../models/card');

describe('Player', () => {
  describe('.drawCard(card)', () => {
    const deck = new Deck();
    const player = new Player();
    it("increases amount of cards in the player's hand", () => {
      player.drawCard(deck.deal());
      expect(player.getCardCount()).to.equal(1);
    });
  });

  describe('.serialize', () => {
    const player = new Player('John');
    player.drawCard(new Card(6, 'blue'));
    expect(player.serialize()).to.eql({
      name: 'John',
      hand: [{ value: 6, color: 'blue' }]
    });
  });
});

describe('unserializePlayer', () => {
  const player = unserializePlayer({
    name: 'Joe',
    hand: [{ value: 5, color: 'yellow' }]
  });
  it('returns a player with the correct name', () => {
    expect(player.getName()).to.eql('Joe');
  });
  it('returns a player with the correct hand', () => {
    expect(player.getHand().length).to.equal(1);
    const card = player.getHand()[0];
    expect(card.getValue()).to.equal(5);
    expect(card.getColor()).to.eql('yellow')
  });
});
