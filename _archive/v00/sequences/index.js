const _ = require('../utils');

const getPossible = work => {
  const possible = [];  
  work.sequences.filter(x => (x && x.root)).forEach(sequence => {
    work.candidates.filter(x => (x && x.pattern)).forEach(candidate => {
      if (sequence.items.includes(candidate)) {
        return;
      }
      const lastPos   = _.getMax(sequence.steps.map(p => (p.position)));
      const lastStep  = sequence.steps.find(x => (x && x.position === lastPos));
      const nextPos   = lastPos + lastStep.candidate.pattern.length;
      const positions = candidate.positions.filter(x => (x && x >= nextPos));
      const safePos   = positions.filter(position => {
        const endLength = position + candidate.pattern.length;
        if (endLength > work.value.length) {
          return false;
        }
        return true;
      });
      safePos.forEach(position => {
        const existing = possible.find(c => (c && 
          c.sequence === sequence &&
          c.candidate === candidate &&
          c.position === position
        ));
        if (existing) { return; }
        possible.push({
          sequence,
          candidate,
          position
        });
      });
    });
  });
  return possible;
}
const hasPossible = work => {
  const possibles = getPossible(work);
  return possibles.length > 0;
}
const buildSteps = work => {
  const possibles = getPossible(work);
  console.log(work);
}

const caclulate = (value, candidates) => {
  const roots = candidates.filter(c => (c && c.positions.includes(0)));
  const work = {
    value,
    candidates,
    sequences : []
  };
  
  for (let i = 0; i < roots.length; i += 1) {
    const root = roots[i];
    work.sequences.push({
      id: i,
      root,
      items: [root],
      steps: [
        {
          position  : 0,
          candidate : root
        }
      ]
    });
  }

  while (hasPossible(work)) {
    buildSteps(work);
  }
  return work.sequences;


}

module.exports = {
  caclulate
};



// const buildPath = (value, candidates, sequence) => {
  
// };

// const buildSequences = (value, candidates) => {
//   const results = [];
//   [].concat(candidates)
//     .filter(candidate => (candidate && candidate.positions))
//     .filter(candidate => (candidate.positions.indexOf(0) >= 0))
//     .forEach(root => {
//       root.positions.forEach(position => {
//         const sequence = {
//           items
//           candidate : root,
//           position
//         };
//         buildPath(value, candidates, sequence);
//       });
//     });
  
  
  
//   let nextItems = getNext(candidates, -1);
//   while (nextItems.length > 0) {
//     nextItems = getNext(candidates, nextPos)
//   }
//   return results;
// };