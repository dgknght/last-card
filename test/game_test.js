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
});
