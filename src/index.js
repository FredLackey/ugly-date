const patterns  = require('./patterns');
const sequences = require('./sequences');

const examineString = value => {
  let candidates  = patterns.findCandidates(value);
  candidates = patterns.pruneTrivial(candidates);
  const seqitems = sequences.caclulate(candidates);
  console.log(seqitems.length);
}

const fullValue = 'Screen Shot 2015-07-09 at 11.33.25 AM';
const cleanValue = '2015-07-09 11.33.25 AM';

examineString(cleanValue);