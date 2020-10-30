const expect = require('chai').expect;
const { Game, unserializeGame } = require('../models/game');
const { Card } = require('../models/card');
const { Player } = require('../models/player');
const { Deck } = require('../models/deck');

describe('Game', () => {

  it('does not allow duplicate names');
  
  describe('.addPlayer(player)', () => {
    const player = new Player('John Doe');

    describe('when the status is "unstarted"', () => {
      const game = new Game([new Player('Abe'), new Player('Ben')]);
      it('adds the specified player to the game', () => {
        game.addPlayer(player);
        expect(game.getPlayers().map(p => p.getName())).to.include('John Doe');
      });
    });

    describe('when the status is "started"', () => {
      const game = new Game([new Player('Abe'), new Player('Ben')]).start();
      it('raises an error', () => {
        expect(() => game.start()).to.throw();
      });
      it('does not add the player to the game', () => {
        try {
          game.addPlayer(player);
        } catch {}
        expect(game.getPlayers().map(p => p.getName())).not.to.include('John Doe');
      });
    });
  });

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

    it('changes the status to "started"', () => {
      expect(game.getStatus()).to.eql('started');
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

  describe('.serialize', () => {
    it('returns the internal state of the game', () => {
      const p1 = new Player('John');
      const p2 = new Player('Jane');
      const c1 = new Card(5, 'blue');
      const c2 = new Card(4, 'yellow');
      const game = new Game([p1, p2], new Deck([c1, c2]));
      expect(game.serialize()).to.eql({
        status: 'unstarted',
        players: [
          { name: 'John', hand: [] },
          { name: 'Jane', hand: [] }
        ],
        currentPlayerIndex: 0,
        deck: {
          cards: [
            { value: 5, color: 'blue' },
            { value: 4, color: 'yellow' }
          ]
        }
      });
    });
  });
});

describe('unserializeGame', () => {
  const game = unserializeGame({
    status: 'started',
    players: [
      { name: 'John' },
      { name: 'Jane' }
    ],
    currentPlayerIndex: 1,
    deck: {
      cards: [
        { value: 1, color: 'blue' },
        { value: 2, color: 'yellow' }
      ]
    }
  });

  it('returns a game with the correct status', () => {
    expect(game.getStatus()).to.eql('started');
  });

  it('returns a game with the correct players', () => {
    const names = game.getPlayers().map(p => p.getName());
    expect(names).to.eql(['John', 'Jane']);
  });

  it('returns a game with the correct deck', () => {
    const deck = game.getDeck();
    const cards = [];
    while(c = deck.deal()) { cards.push(c); }
    expect(cards.length).to.equal(2);
  });

  it('returns a game with the correct current player marker', () => {
    expect(game.getCurrentPlayer().getName()).to.eql('Jane');
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
