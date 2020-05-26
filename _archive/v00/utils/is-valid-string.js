module.exports = (value, isEmptyOkay) => {
  return (typeof value === 'string' && (isEmptyOkay || value.trim().length > 0));
};
