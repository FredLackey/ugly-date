const { ALPHANUMERIC } = require('./constants');
const isValidString = require('./is-valid-string');

module.exports = value => {
  return isValidString(value) && 
    value === value.split('')
      .filter(ch => (ch && ALPHANUMERIC.indexOf(ch.toUpperCase()) >= 0))
      .join('');
};
