module.exports = (value, isCaseSenstivie = false) => {
  const values = [];
  let curValue = '';
  value.split('').forEach(ch => {
    if (
      (curValue.length === 0) ||
      (isCaseSenstivie && curValue[curValue.length - 1] === ch) || 
      (!isCaseSenstivie && curValue[curValue.length - 1].toUpperCase() === ch.toUpperCase())) {
      curValue += ch;
      return;
    }
    values.push(curValue);
    curValue = ch;
  });
  if (curValue) { values.push(curValue); }
  return values;  
};
