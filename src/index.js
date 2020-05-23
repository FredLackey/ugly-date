const patterns = require('./patterns');

const examineString = value => {
  let candidates = patterns.findCandidates(value);
  candidates = patterns.pruneCandidates(candidates);
  console.log(candidates.length);
}

const value = '3367-2016-10-13-18-39-37';

examineString(value);