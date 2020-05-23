const DIGITS = '0123456789';

module.exports = value => {
  value = `${value}`;
  return (value === value.split('').filter(ch => (
    DIGITS.contains(ch)
  ).join('')));
};
