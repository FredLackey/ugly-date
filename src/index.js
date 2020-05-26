const parser      = require('./parser');
const patterns    = require('./patterns');
const validators  = require('./validators');

const analyze = value => {
  
  // Locate known patterns in the supplied value.
  let locations = patterns.locate(value);
  
  // Remove any weaker patterns if more verbose patterns were found.
  locations = patterns.pruneTrivial(locations);
  
  // Break down multiple positions into unique location instances.
  patterns.split(locations);
  
  // Validate each detected pattern to remove false positives.
  validators.validate(value, locations);
  
  // Fitler out invalid instances.
  locations = locations.filter(x => (x && x.isValid === true));
  
  // Locate the formal versions of each pattern.
  validators.reformat(locations);
  
  const results = {
    pattern : patterns.assemble(value, locations),
    locations: locations.filter(x => (x && x.formal)).map(x => ({
      formal  : x.formal,
      pattern : x.pattern,
      position: x.position,
      value   : x.value,
      values  : JSON.parse(JSON.stringify(x.values))
    })),
    value,
    values: {}
  };
  results.locations.filter(x => (x && x.values)).forEach(location => {
    Object.keys(location.values).forEach(key => {
      results.values[key] = location.values[key];
    });
  });
  results.date = parser.toDate(results);
  
  return results;
};

module.exports = {
  analyze
};