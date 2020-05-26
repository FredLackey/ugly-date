const { SEPARATORS } = require('./constants');

module.exports = ch => {
  return (
    typeof ch === 'string' &&
    ch.length === 1 &&
    SEPARATORS.indexOf(ch) >= 0
  );
}
