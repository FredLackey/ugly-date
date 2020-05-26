const getMin = values => {
  let min = null;
  [].concat(values)
    .filter(value => (value != null))
    .forEach(value => {
      if (min === null || value < min) {
        min = value;
      }
    });
  return min;
}

module.exports = getMin;
