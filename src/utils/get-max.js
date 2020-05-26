const getMax = values => {
  let max = -1;
  [].concat(values)
    .filter(value => (value != null))
    .forEach(value => {
      if (value > max) {
        max = value;
      }
    });
  return max;
};

module.exports = getMax;
