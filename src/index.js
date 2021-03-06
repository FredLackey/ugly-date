const filters     = require('./filters');
const parser      = require('./parser');
const patterns    = require('./patterns');
const validators  = require('./validators');

const analyze = value => {
  
  // Locate known patterns in the supplied value.
  let locations = patterns.locate(value);
  
  // Break down multiple positions into unique location instances.
  patterns.split(locations);
  
  // Validate each detected pattern to remove false positives.
  validators.validate(value, locations);
  
  // Fitler out invalid instances.
  locations = locations.filter(x => (x && x.isValid === true));
  
  // Remove any weaker patterns if more verbose patterns were found.
  locations = patterns.pruneTrivial(locations);
  
  locations = filters.valids.positionLength(locations);
  
  // Remove any items suggested in a position known to be valid
  locations = patterns.removeOverlap(locations);
  
  // Locate the formal versions of each pattern.
  validators.reformat(locations);
  
  const results = {
    value,
    pattern   : patterns.assemble(value, locations),
    hasDate   : locations.filter(x => (x && x.type === 'DATE')).length > 0,
    hasDay    : locations.filter(x => (x && x.type === 'DAY')).length > 0,
    hasTime   : locations.filter(x => (x && x.type === 'TIME')).length > 0,
    locations : locations.filter(x => (x && x.formal)).map(x => ({
      formal  : x.formal,
      pattern : x.pattern,
      position: x.position,
      type    : x.type,
      value   : x.value,
      values  : JSON.parse(JSON.stringify(x.values))
    })),
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