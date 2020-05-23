const _ = require('../../utils');

const items = [
  {
    format: 'YYYY',
    validator: (value) => (
      _.isNumber(value) &&
      Number(value) >= 1970 &&
      Number(value) <= 9999
    )
  },
  {
    format: 'YY',
    validator: (value) => (
      _.isNumber(value) &&
      Number(value) >= 70 &&
      Number(value) <= 99
    )
  },
  {
    format: ['M', 'MM'],
    validator: (value) => (
      _.isNumber(value) &&
      Number(value) >= 1 &&
      Number(value) <= 12
    )
  },
  // {
  //   format: ['MMM','MMMM'],
  //   validator: (value) => (
  //     _.string(value) &&
  //     !_.isNumber(value)
  //   )
  // },
  {
    format: ['D DD'],
    validator: (value) => (
      _.isNumber(value) &&
      Number(value) >= 1 &&
      Number(value) <= 31
    )
  },
  // {
  //   format: ['DDD', 'DDDD'],
  //   validator: (value) => (
  //     _.string(value) &&
  //     !_.isNumber(value)
  //   )
  // },
  {
    format: 'X',
    example: '1410715640.579',
    description: 'Unix timestamp',
    validator: (value) => {
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
    validator: (value) => (
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
