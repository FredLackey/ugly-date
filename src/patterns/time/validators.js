const _ = require('../../utils');

const items = [
  {
    format: ['H','HH'],
    example: '0..23',
    description: 'Hours (24 hour time)',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 0 && 
      Number(value) <= 23)
  },
  {
    format: ['h','hh'],
    example: '1..12',
    description: 'Hours (12 hour time used with a A.)',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 1 && 
      Number(value) <= 12
    )
  },
  {
    format: ['k','kk'],
    example: '1..24',
    description: 'Hours (24 hour time from 1 to 24)',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 1 && 
      Number(value) <= 24
    )
  },
  {
    format: 'a A',
    example: 'am pm',
    description: 'Post or ante meridiem (Note the one character a p are also considered valid)',
    validator: (value) => (
      _.isValidString(value) &&
        ['AM', 'PM'].includes(value.toUpperCase())
    )
  },
  {
    format: ['m', 'mm'],
    example: '0..59',
    description: 'Minutes',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 0 && 
      Number(value) <= 59
    )
  },
  {
    format: ['s','ss'],
    example: '0..59',
    description: 'Seconds'
  },
  {
    format: [
      'S',
      'SS',
      'SSS',
      'SSSS',
      'SSSSS',
      'SSSSSS',
      'SSSSSSS',
      'SSSSSSSS',
      'SSSSSSSSS',
    ],
    example: '0..999999999',
    description: 'Fractional seconds',
    validator: (value, token) => (
      _.isNumber(value) &&
      `${value}`.length === token.length &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 0 && 
      Number(value) <= 999999999
    )
  },
  {
    format: ['Z', 'ZZ'],
    example: '+12:00',
    description: 'Offset from UTC as +-HH:mm, +-HHmm, or Z',
    validator: (value) => {
      if (!_.isValidString(value)) { return false; }
      if (value.length < 5 || value.length > 6) { return false; }
      if (!'+-'.contains(value[0])) { return false; }
      value = value.subst(1);
      value = value.split(':');
      return (
        _.isNumber(value[0]) && _.isNumber(value[1]) &&
        Number(value[0]) >= 0 && Number(value[0]) <= 24 &&
        Number(value[1]) >= 0 && Number(value[1]) <= 59
      );
    }
  },
];

items.forEach(item => {
  item.type = 'TIME';
});

module.exports = items;
