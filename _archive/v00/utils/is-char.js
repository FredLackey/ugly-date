const { ALPHANUMERIC } = require('./constants');

module.exports = ch => {
  return (
    typeof ch === 'string' &&
    ch.length === 1 &&
    ALPHANUMERIC.indexOf(ch.toUpperCase()) >= 0
  );
}
