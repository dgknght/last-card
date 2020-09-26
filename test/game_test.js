const expect = require('chai').expect;
const Game = require('../models/game');
const Card = require('../models/card').Card;
const Player = require('../models/player');

describe('Game', () => {

  it('does not allow duplicate names');
  
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

    it('sets the current player', () => {
      expect(game.getCurrentPlayer()).to.equal(player1);
    });
  });

  describe('.playCard()', () => {
    describe('with a valid card', () => {
      const player1 = new Player('player1');
      const player2 = new Player('player2');
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
      const game = new Game([player1, player2], deck);
      game.start();
      game.playCard(new Card(0, 'blue'));

      it('puts selected card on the discard pile', () => {
        expect(game.getTopDiscard().equals(new Card(0, 'blue'))).to.be.true;
      });

      it("removes selected card from the player's hand", () => {
        expect(game.getPlayers()[0].getCardCount()).to.equal(6);
      });

      it('advances the current player', () => {
        expect(game.getCurrentPlayer().getName()).to.equal(player2.getName());
      });
    });

    describe('with an invalid card', () => {
      const player1 = new Player('player1');
      const player2 = new Player('player2');
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
      const game = new Game([player1, player2], deck);
      game.start();
      var error = null;
      try {
        game.playCard(new Card(0, 'red'));
      } catch (e) {
        error = e;
      }

      it('rejects an invalid card', () => {
        expect(error).not.to.be.null;
      });

      it('does not put selected card on the discard pile', () => {
        expect(game.getTopDiscard().equals(new Card(0, 'blue'))).to.be.false;
      });

      it('does not advance the current player', () => {
        expect(game.getCurrentPlayer().getName()).to.equal(player1.getName());
      });
    });

    // TODO: Test that the first player goes after the last player
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
