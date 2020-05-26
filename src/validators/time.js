const _ = require('../utils');

const items = [
  {
    format: ['H', 'HH'],
    example: '0..23',
    description: 'Hours (24 hour time)',
    formal: 'HH',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 0 && 
      Number(segment) <= 23
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
    },
  {
    format: ['h', 'hh'],
    example: '1..12',
    description: 'Hours (12 hour time used with a A.)',
    formal: 'hh',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 1 && 
      Number(segment) <= 12
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
    },
  {
    format: ['k', 'kk'],
    example: '1..24',
    description: 'Hours (24 hour time from 1 to 24)',
    formal: 'kk',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 1 && 
      Number(segment) <= 24
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
    },
  {
    format: [
      'a', 
      'A',
      'aa', // UNOFFICIAL
      'AA'  // UNOFICIAL
    ],
    example: 'am pm',
    description: 'Post or ante meridiem (Note the one character a p are also considered valid)',
    formal: 'a',
    validator: (value, segment, token) => (_.isValidString(segment) && ['AM', 'PM'].includes(segment.toUpperCase())),
    toValue: (value, segment, token) => ((_.isValidString(segment) && ['AM', 'PM'].includes(segment.toUpperCase())) ? segment : undefined),
  },
  {
    format: ['m', 'mm'],
    example: '0..59',
    description: 'Minutes',
    formal: 'mm',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 0 && 
      Number(segment) <= 59
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
    },
  {
    format: ['s', 'ss'],
    example: '0..59',
    description: 'Seconds',
    formal: 'ss',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 0 && 
      Number(segment) <= 59
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
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
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      `${segment}`.length === token.length &&
      [1, 2].includes(`${segment}`.length) &&
      Number(segment) >= 0 && 
      Number(segment) <= 999999999
      ),
      toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
    },
  {
    format: ['Z', 'ZZ'],
    example: '+12:00',
    description: 'Offset from UTC as +-HH:mm, +-HHmm, or Z',
    formal: 'Z',
    validator: (value, segment, token) => {
      if (!_.isValidString(segment)) { return false; }
      if (segment.length < 5 || segment.length > 6) { return false; }
      if (!'+-'.contains(segment[0])) { return false; }
      segment = segment.subst(1);
      segment = segment.split(':');
      return (
        _.isNumber(segment[0]) && _.isNumber(segment[1]) &&
        Number(segment[0]) >= 0 && Number(segment[0]) <= 24 &&
        Number(segment[1]) >= 0 && Number(segment[1]) <= 59
      );
    },
    toValue: (value, segment, token) => (_.isNumber(segment) ? Number(segment) : undefined)
  },
];

items.forEach(item => {
  item.type = 'TIME';
});

module.exports = items;
