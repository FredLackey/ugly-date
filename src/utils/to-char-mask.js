const toCharLenArray    = require('./to-char-len-array');
const { ALPHANUMERIC }  = require('./constants');

module.exports = (value, delimiter = '-') => {
  const lengths = toCharLenArray(value);
  if (typeof lengths !== 'object' || !(lengths instanceof Array)) {
    return '';
  }
  let mask = '';
  lengths.forEach(len => {
    if (len === 0) { 
      mask += ' ';
      return;
    }
    if (mask && !mask.endsWith(' ')) {
      mask += delimiter;
    }
    mask += ALPHANUMERIC.substr(0, Number(len));
  });
  return mask;
};
