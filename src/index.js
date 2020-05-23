const patterns = require('./patterns');

const examineString = value => {
  const candidates = patterns.findCandidates(value);
  console.log(candidates.length);
}

const fullValue = 'Screen Shot 2015-07-09 at 11.33.25 AM';
const cleanValue = '2015-07-09 11.33.25 AM';

examineString(cleanValue);