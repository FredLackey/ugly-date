const isValidString = require('./is-valid-string');

module.exports = value => {
  return isValidString(value, true) && value.trim().length === 0;
};
