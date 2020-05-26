const _ = require('./utils');



// item, position, value, candidates, parent)
// const buildPath = (work, candidate, position) => {
//   if ((position + candidate.pattern.length) > work.value.length) {
//     return;
//   }
//   const snippet  = work.value.substr(position, candidate.pattern.length);
//   const nextPos  = position + candidate.pattern.length;
//   const children = work.candidates
//     .filter(x => (x && x.positions && x.positions.length > 0))
//     .filter(x => (x.positions.filter(p => (p >= nextPos)).length > 0));
//   candidate.paths = [];
//   children.forEach(child => {
//     const positions = child.positions.filter(x => (x && x >= nextPos));
//     positions.forEach(position => {
//       candidate.paths.push({
//         child,
//         position
//       })
      
//       processStep(work, child, position);      
//     });
//   });
// };

// const buildPaths = (work, candidates, nextPos) => {
//   const nextCandidates = candidates
//     .filter(x => (x && x.positions && x.positions.length > 0))
//     .filter(x => (x.positions.filter(y => (y === nextPos))));
//     nextCandidates.forEach(candidate => {
//     buildPath(work, candidate, nextPos);
//   });
// }

const buildPath = (work, path) => {
}

module.exports = (value, candidates) => {
  const roots = candidates.filter(x => (x && x.positions.includes(0)));
  const work = {
    value,
    candidates,
    paths: roots.map(root => ({
      value,
      items: [root]
    }))
  };
  work.paths.forEach(path => {
    buildPath(work, path);
  })
};
