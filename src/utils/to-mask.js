const { ALPHANUMERIC } = require('./constants');
const isAlpha = require('./is-alphanumeric');

module.exports = (value) => {
  let mask  = '';
  let count = -1;
  value.split('').forEach(ch => {

    if (isAlpha(ch)) {
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
