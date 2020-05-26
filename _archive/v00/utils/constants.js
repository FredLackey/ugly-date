const ALPHA         = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS        = '0123456789';
const ALPHANUMERIC  = ALPHA + DIGITS;

const MIN_DATE      = new Date(1970, 1, 1);
const MIN_DATE_UNIX = MIN_DATE.getTime()/1000;
const MAX_DATE      = new Date(1999, 12, 31);
const MAX_DATE_UNIX = MAX_DATE.getTime()/1000;

module.exports = {
  ALPHA,
  ALPHANUMERIC,
  DIGITS,

  MIN_DATE,
  MIN_DATE_UNIX,
  MAX_DATE,
  MAX_DATE_UNIX,
};