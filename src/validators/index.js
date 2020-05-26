const _     = require('../utils');
const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const all = [].concat(date, day, time).filter(_.isValidObject);

const splitPattern = value => {
  if (!_.isAlphanumeric(value)) { 
    return null; 
  }
  const patterns = [];
  const curPattern = '';
  value.split('').forEach(ch => {
    if (!curPattern || curPattern.toUpperCase()[curPattern.length - 1 ] === ch.toUpperCase()) {
      curPattern += ch;
      return;
    }
    patterns.push(curPattern);
    curPattern = ch;
  });
  if (curPattern) { patterns.push(curPattern); }
  return patterns;
}
// const hasMultiplePatterns = value => {
//   const results = splitPattern(value);
//   return results.length > 1;
// }

const validate = (value, locations) => {
 
  [].concat(locations).filter(x => (x && x.patternMask && x.segments && x.segments.pattern.length > 0)).forEach(location => {
    let count = 0;
    for (let i = 0; i < location.segments.pattern.length; i += 1) {
      const curPattern  = location.segments.pattern[i];
      const curValue    = location.segments.value[i];
      if (curValue.trim().length === 0) {
        continue;
      }
      if (_.isSeparators(curPattern)) {
        continue;
      }
      if (_.isEmpty(curPattern)) {
        continue;
      }
      const validators = all.filter(x => (x && (
        x.format === curPattern || 
        (x.format instanceof Array && x.format.includes(curPattern))
      )));
      if (validators.length === 0) {
        location.error = new Error(`Inadequate validators for pattern: ${curPattern}`);
        break;
      }
      if (validators.length > 1) {
        location.error = new Error(`Excessive validators for pattern: ${curPattern}`);
        break;
      }
      // (value, segment, token)
      if (validators[0].validator(value, curValue, curPattern)) {
        count += 1;
      } else {
        location.isValid = false;
      }
    }
    location.isValid = (count > 0) && location.isValid !== false && !location.error;
  });
};

module.exports = {
  validate
};
