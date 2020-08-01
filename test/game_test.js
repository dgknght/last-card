const expect = require('chai').expect;
const Game = require('../models/game');
const Player = require('../models/player');

describe('Game', () => {
  describe('.start()', () => {
    const player1 = new Player();
    const player2 = new Player();
    const game = new Game([player1, player2]);
    game.start();

    it('deals each player the correct amount of cards', () => {
      expect(game.getPlayers().length).to.equal(2);
      expect(game.getPlayers()[0].getCardCount()).to.equal(7);
      expect(game.getPlayers()[1].getCardCount()).to.equal(7);
    });

    it('puts 1 card in discard pile', () => {
      expect(game.getDiscardPile().length).to.equal(1);
    });

    it('leaves correct number of cards in deck', () => {
      expect(game.getDeck().getCardCount()).to.equal(93); // 108 - (7 + 7 + 1) = 93
    });
  });

  describe('.playCard()', () => {
    const player1 = new Player();
    const player2 = new Player();
    const deck = new TestDeck([
      new Card(0, 'blue'),
      new Card(1, 'blue'),
      new Card(2, 'blue'),
      new Card(3, 'blue'),
      new Card(4, 'blue'),
      new Card(5, 'blue'),
      new Card(6, 'blue'),
      new Card(7, 'blue'),
      new Card(8, 'blue'),
      new Card(9, 'blue'),
      new Card(1, 'blue'),
      new Card(2, 'blue'),
      new Card(3, 'blue'),
      new Card(4, 'blue'),
      new Card(5, 'blue')
    ]);
    const game = new Game([player1, player2]);
    game.start();
    game.playCard(new Card(0, 'blue'));

    it('puts selected card on the discard pile', () => {
      expect(game.getTopDiscard()).to.equal(new Card(0, 'blue'));
    });

    it("removes selected card from the player's hand", () => {
      expect(game.getPlayers()[0].getCardCount()).to.equal(6);
      
    });
    // TODO: Test for invalid card

  });
});

function TestDeck(cards) {
  this._cards = cards;
  this.shuffle = function() {};
  this.deal = function() {
    const card = this._cards.shift();
    return card;
  };
};
