const COLORS = ['blue', 'red', 'yellow', 'green'];
const COLORED_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'drawTwo', 'skip', 'reverse'];
const NON_COLORED_VALUES = ['wild', 'wildDrawFour'];
const VALUES = COLORED_VALUES + NON_COLORED_VALUES;
const Card = function(value, color) {

  if (!VALUES.includes(value)) {
    throw new Error(`"${value}" is invalid. The value must be 0-9, "drawTwo", "wildDrawFour", "wild", "skip", or "reverse"`);
  }

  this._value = value;
  this._color = color;

  this.getValue = () => {
    return this._value;
  };

  this.getColor = () => {
    return this._color;
  };

  this.equals = (card) => {
    if (card.getValue === undefined || card.getColor === undefined) return false;
    return this._value === card.getValue() && this._color === card.getColor();
  };
};

module.exports = {
  COLORS,
  COLORED_VALUES,
  NON_COLORED_VALUES,
  Card
};
