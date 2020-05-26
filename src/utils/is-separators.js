const isSeparator = require('./is-separator');
const isValidString = require('./is-valid-string');

module.exports = value => {
  return isValidString(value) && value === value.split('').filter(isSeparator).join('');
};
