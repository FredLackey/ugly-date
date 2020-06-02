const _ = require('../../utils');

const positionLength = items => {
  const positionsDuplicates = [];
  const positions = [];
  items.filter(x => (x && x.isValid)).forEach(item => {
    if (positions.includes(item.position)) {
      positionsDuplicates.push(item.position);
    } else {
      positions.push(item.position);
    }
  });
  positionsDuplicates.forEach(position => {
    const dupItems    = items.filter(x => (x && x.isValid && x.position === position));
    const dupLengths  = dupItems.map(x => (x.pattern.length));
    const maxLength   = _.getMax(dupLengths);
    const maxItems    = dupItems.filter(x => (x && x.pattern && x.pattern.length === maxLength));
    const remaining   = dupItems.filter(x => (x && x.pattern && !maxItems.includes(x)));
    if (maxItems.length !== 1 || remaining.length === 0) {
      return;
    }
    remaining.filter(x => (x && x.isValid)).forEach(x => { x.remove = true; });
  });
  const results = items.filter(x => (x && x.isValid && x.remove !== true));
  return results;
};

module.exports = positionLength;
