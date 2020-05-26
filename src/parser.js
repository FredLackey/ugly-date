const _ = require('./utils');

// TODO: Move this to a "Normalize" method and place intelligence in validators.

const toFull = ({ YYYY, MM, DD, hh, mm, ss, aa }) => {
  if (!_.isNumber(YYYY)) { return undefined; }
  if (!_.isNumber(MM)) { return undefined; }
  if (!_.isNumber(DD)) { return undefined; }
  if (!_.isNumber(hh)) { return undefined; }
  if (!_.isNumber(mm)) { return undefined; }
  
  const isPm = (_.isValidString(aa) && ['P', 'PM'].includes(aa.toUpperCase()));
  const hour = (hh === 0 || hh > 12) 
  ? hh 
  : isPm 
    ? (hh + 12) 
    : hh;
  
  const result = _.isNumber(ss)
    ? new Date(YYYY, (MM - 1), DD, hour, mm, ss)
    : new Date(YYYY, (MM - 1), DD, hour, mm);

  return result;
};
const toPartial = ({ YYYY, MM, DD }) => {
  if (!_.isNumber(YYYY)) { return undefined; }
  if (!_.isNumber(MM)) { return undefined; }
  if (!_.isNumber(DD)) { return undefined; }
  const result = new Date(YYYY, (MM - 1), DD);
  return result;
};
const toNumber = (a, b) => {
  return _.isNumber(a) ? a : b;
}
const toDate = results => {

  if (!results || !results.values) { return undefined; } 
  const { YYYY, M, MM, D, DD, h, hh, m, mm, s, ss, a, aa } = results.values;
  
  const date = 
    toFull({
      YYYY,
      MM: toNumber(M, MM),
      DD: toNumber(D, DD),
      hh: toNumber(h, hh),
      mm: toNumber(m, mm),
      ss: toNumber(s, ss),
      aa: (_.isValidString(a) ? a : aa)
    }) ||
    toPartial({
      YYYY,
      MM: toNumber(M, MM),
      DD: toNumber(D, DD),
    });
    
  return date;
};

module.exports = {
  toDate
};
