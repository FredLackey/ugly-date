const isValidString = require('./is-valid-string');

module.exports = value => {
  return isValidString(value) && 
    value === value.split('')
      .filter(ch => (ch && ch === '-'))
      .join('');
};
