const isNumber        = require('./is-number');
const toCharLenArray  = require('./to-char-len-array');

module.exports = (value, delimiter = '-') => {
  const array = toCharLenArray(value);
  if (typeof array !== 'object' || !(array instanceof Array)) {
    return '';
  }
  return array
    .filter(isNumber)
    .map(x => (
      (x === 0) ? ' ' : `${x}`.trim()
    ))
    .join(delimiter);
};
