const toCharLenArray    = require('./to-char-len-array');
const { ALPHANUMERIC }  = require('./constants');

module.exports = (value) => {
  let mask  = '';
  let count = -1;
  value.split('').forEach(ch => {

    if (ALPHANUMERIC.includes(ch.toUpperCase())) {
      count += 1;
      mask += ALPHANUMERIC.substr(count, 1);
      return;
    } 

    if (ch === ' ') {
      mask += ' ';
    } else {
      mask += '-'
    }
    
    count = -1;
    return;
  })
  return mask;
};
