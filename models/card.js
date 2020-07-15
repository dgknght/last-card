const RED = 'red';
const COLORS = ['blue', RED, 'yellow', 'green'];
const COLORED_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+2", "skip", "reverse"];
const NON_COLORED_VALUES = ['wild', '+4'];
const VALUES = COLORED_VALUES + NON_COLORED_VALUES;
const Card = function(value, color) {

  if (!VALUES.includes(value)) {
    throw new Error('value must be 0-9, "+2", "+4", "wild", "skip", or "reverse"');
  }

  this._value = value;
  this._color = color; 

  this.getValue = () => {
    return this._value;
  };

  this.getColor = () => {
    return this._color;
  };
};

module.exports = {
  COLORS,
  COLORED_VALUES,
  NON_COLORED_VALUES,
  Card
};
