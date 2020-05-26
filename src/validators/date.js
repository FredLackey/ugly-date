const _ = require('../utils');

const items = [
  {
    format: 'YYYY',
    example: '',
    description: '',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1970 &&
      Number(segment) <= 9999
    )
  },
  {
    format: 'YY',
    example: '',
    description: '',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 70 &&
      Number(segment) <= 99
    )
  },
  {
    format: ['M', 'MM'],
    example: '',
    description: '',
    formal: 'MM',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1 &&
      Number(segment) <= 12
    )
  },
  // {
  //   format: ['MMM','MMMM'],
  //   example: '',
  //   description: '',
  //   formal: '',
  //   validator: (value, segment, token) => (
  //   )
  // },
  {
    format: ['D', 'DD'],
    example: '',
    description: '',
    formal: 'DD',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1 &&
      Number(segment) <= 31
    )
  },
  // {
  //   format: ['DDD', 'DDDD'],
  //   example: '',
  //   description: '',
  //   formal: '',
  //   validator: (value, segment, token) => (
  //   )
  // },
  {
    format: 'X',
    example: '1410715640.579',
    description: 'Unix timestamp',
    formal: '',
    validator: (value, segment, token) => {
      if (!_.isNumber(value)) { return false; }
      const parts = `${value}`.split('.');
      return (
        parts.length === 2 &&
        _.isNumber(parts[0]) && _.isNumber(parts[1]) &&
        Number(`${parts[0]}${parts[1]}`) >= _.MIN_DATE_UNIX &&
        Number(`${parts[0]}${parts[1]}`) <= _.MAX_DATE_UNIX
      );
    }
  },
  {
    format: 'x',
    example: '1410715640579',
    description: 'Unix ms timestamp',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(value) &&
      Number(value) >= _.MIN_DATE_UNIX &&
      Number(value) <= _.MAX_DATE_UNIX
    )
  }
];

items.forEach(item => {
  item.type = 'DATE';
});

module.exports = items;
