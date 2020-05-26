const _     = require('../utils');
const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const all = [].concat(date, day, time).filter(_.isValidString);

const locate = value => {
  const valueMask = _.toMask(value);
  const locations = [];
  all.forEach(pattern => {
    const patternMask = _.toMask(pattern);
    for (let x = 0; x < valueMask.length; x += 1) {
      let valueMaskSnip = valueMask.substr(x);
      if (valueMaskSnip.length < patternMask.length) { break; }
      valueMaskSnip = valueMaskSnip.substr(0, patternMask.length);
      if (valueMaskSnip === patternMask) {
        locations.push({
          pattern,
          patternMask,
          position: x,
          value: value.substr(x, patternMask.trim().length)
        });
      }
    }
  });
  return locations;
};
const split = (locations) => {
  [].concat(locations).filter(x => (x && x.patternMask)).forEach(location => {
    let curPattern  = '';
    let curValue    = '';
    let count       = 0;
    location.segments = {
      pattern : [],
      value   : [],
    };
    for (let i = 0; i < location.patternMask.length; i += 1) {
      const patternChar = location.pattern[i];
      const lastChar    = (curValue.length > 0) ? curValue[curValue.length - 1] : '';
      const isSame      = lastChar.length > 0 && (
        (patternChar === ' ' && lastChar === ' ') ||
        // (patternChar === '-' && lastChar === '-') ||
        (_.isSeparator(patternChar) && _.isSeparator(lastChar)) || 
        (_.isAlphanumeric(patternChar) === _.isAlphanumeric(lastChar))
      );
      if (patternChar !== ' ' && !_.isAlphanumeric(patternChar) && !_.isSeparator(patternChar)) {
        throw new Error('WTF!?!');
      }

      if (!isSame && curValue.length > 0) {
        location.segments.pattern.push(curPattern);
        location.segments.value.push(curValue);
        curPattern = '';
        curValue = '';
      }

      curValue += location.value[i];
      curPattern += patternChar;
      count += 1;
    }
    if (curValue.length > 0) {
      location.segments.pattern.push(curPattern);
      location.segments.value.push(curValue);
      curPattern = '';
      curValue = '';
    }
  });
};

const getSuperior = (item, items) => {
  const results = items.filter(x => (x && x.pattern && 
    x !== item && 
    x.pattern.length >= item.pattern.length && 
    // x.pattern.indexOf(item.pattern) === 0));
    x.pattern.toUpperCase().indexOf(item.pattern.toUpperCase()) === 0));
  return results;
};
const getTrivial = items => {
  const trivial = [];
  items.filter(x => (x && x.pattern)).forEach(item => {
    const superior = getSuperior(item, items);
    if (superior.length > 0) {
      trivial.push(item);
    }
  });
  return trivial;
};
const hasTrivial = items => {
  const trivial = getTrivial(items);
  return trivial.length > 0;
};
const removeTrivial = items => {
  const results = [];
  items.filter(x => (x && x.pattern)).forEach(item => {
    const superior = getSuperior(item, items);
    if (superior.length === 0) {
      results.push(item);
    }
  });
  return results;
};
const pruneTrivial = items => {
  let result = removeTrivial(items);
  while (hasTrivial(result)) {
    result = removeTrivial(result);
  }
  return result;
};

const assemble = (value, locations) => {
  const impacted = [];
  let result = '';
  for (let l = 0; l < locations.length; l += 1) {
    for (let v = 0; v < locations[l].value.length; v += 1) {
      impacted.push(locations[l].position + v);
    }
  }
  for (let i = 0; i < value.length; i += 1) {
    // eslint-disable-next-line no-loop-func
    const item = locations.find(x => (x && x.position === i));
    if (item) {
      result += item.formal;
    }
    if (impacted.includes(i)) {
      continue;
    }
    result += value[i];
  }
  return result;
};

module.exports = {
  all,
  
  date,
  day,
  time,
  
  locate,
  split,
  pruneTrivial,
  assemble
};
