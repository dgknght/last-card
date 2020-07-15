const card = require('./card');

console.log(card);

module.exports = function() {
  this._cards = card.COLORS.flatMap(color => {
    return card.COLORED_VALUES.map(value => {
      new card.Card(value, color);
    });
  });

  this.getCardCount = function() {
    return this._cards.length;
  };
};
