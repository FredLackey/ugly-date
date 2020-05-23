const _     = require('../utils');

const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const findCandidates = value => {
  const hash = _.toCharMask(value);
  const patterns = [].concat(
    date.patterns,
    day.patterns,
    time.patterns
  );
  const valid = patterns.filter(_.isValidString);
  const items = valid.map(pattern => ({
    pattern,
    hash : _.toCharMask(pattern)
  }));
  items.forEach(item => {
    item.index = hash.indexOf(item.hash);
  });
  return items.filter(item => (
    item && item.index >= 0
  ));
};

const findTrivial = items => {
  items.forEach(item => {
    item.better = [];
  });
  items.forEach(item => {
    item.better = items.filter(other => (
      (other !== item) &&
      other.pattern.length > item.pattern.length &&
      other.pattern.indexOf(item.pattern) >= 0
    ));
  });
}
const hasTrivial = items => {
  findTrivial(items);
  return items
    .filter(item => (item && item.better.length > 0))
    .length > 0;
}
const removeTrivial = items => {
  findTrivial(items);
  return items.filter(x => (x && x.better.length === 0));
}

const pruneCandidates = items => {
  let result = [].concat(items).filter(x => (x && x.pattern));
  while (hasTrivial(result)) {
    result = removeTrivial(result);
  }
  return result;
}

module.exports = {
  findCandidates,
  pruneCandidates
};
