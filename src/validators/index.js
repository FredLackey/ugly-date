const _     = require('../utils');
const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const all = [].concat(date, day, time).filter(_.isValidObject);

const validate = (value, locations) => {
 
  [].concat(locations).filter(x => (x && x.patternMask && x.segments && x.segments.pattern.length > 0)).forEach(location => {
    let count = 0;
    for (let i = 0; i < location.segments.pattern.length; i += 1) {

      if (_.isSeparators(location.segments.pattern[i])) {
        continue;
      }
      if (_.isEmpty(location.segments.pattern[i])) {
        continue;
      }
      
      const tokens = _.toTokenList(location.segments.pattern[i]);

      const pastTokens = [];
      // eslint-disable-next-line no-loop-func
      tokens.forEach(token => {

        const position    = pastTokens.join('').length;
        const segment     = location.segments.value[i].substr(position, token.length);
        const validators  = all.filter(x => (x && (
          x.format === token || 
          (x.format instanceof Array && x.format.includes(token))
        )));
        if (validators.length === 0) {
          location.error = new Error(`Inadequate validators for pattern: ${token}`);
          return;
        }
        if (validators.length > 1) {
          location.error = new Error(`Excessive validators for pattern: ${token}`);
          return;
        }
        
        // (value, segment, token)
        if (validators[0].validator(value, segment, token)) {
          count += 1;
        } else {
          location.isValid = false;
        }

        pastTokens.push(token);
      });
    }
    location.isValid = (count > 0) && location.isValid !== false && !location.error;
  });
};

const reformat = items => {
  items.forEach(item => {
    const segments  = _.toTokenList(item.pattern);
    const history   = [];
    const values    = [];
    const formal    = [];
    item.values     = {};
    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i];
      const value   = item.value.substr(history.join('').length, segment.length);
      const validator = all.find(x => (x && (
        x.format === segment || 
        (x.format instanceof Array && x.format.includes(segment))
      )));
      history.push(segment);
      values.push(value);
      if (validator) {
        formal.push(validator.formal || segment);
        item.values[segment] = validator.toValue(null, value, segment);
      } else {
        formal.push(value);        
      }
    }
    item.formal = formal.join('');
  });
};

module.exports = {
  validate,
  reformat
};
