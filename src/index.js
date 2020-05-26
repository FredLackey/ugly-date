'use strict';

const patterns    = require('./patterns');
const validators  = require('./validators');

const analyze = value => {
  let locations = patterns.locate(value);
  locations = patterns.pruneTrivial(locations);
  patterns.split(locations);
  validators.validate(value, locations);
  const valid = locations.filter(x => (x && x.isValid === true));
  console.log(valid.length);
};

module.exports = {
  analyze
};