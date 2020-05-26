module.exports = (value, isEmptyOkay = true) => {
  return (
    typeof value === 'object' && 
    value !== null && 
    !(value instanceof Array) &&
    (isEmptyOkay || Object.keys(value).length > 0)
  );
};
