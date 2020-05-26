const { ALPHANUMERIC } = require('./constants');
const isValidString = require('./is-valid-string');

module.exports = value => {
  if (!isValidString(value)) { return null; }
  const parts = [];
  let curPart = '';
  value.toUpperCase().split('').forEach(ch => {

    if (ch === ' ') { 
      parts.push(0);
      if (curPart) {
        parts.push(curPart.length);
        curPart = '';
      }
      return;
    }
    
    if (ALPHANUMERIC.indexOf(ch) >= 0) {
      curPart += ch;
      return;
    }
    
    if (curPart) {
      parts.push(curPart.length);
      curPart = '';
      return;
    }
    
  });
  if (curPart) {
    parts.push(curPart.length);
    curPart = '';
  }
  return parts;
};
