module.exports = function(value, color) {
  const VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+2", "+4", "wild", "skip", "reverse"];

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
