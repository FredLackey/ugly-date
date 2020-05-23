const _ = require('../../utils');

const items = [
  {
    format: 'gggg',
    example: '2014',
    description: 'Locale 4 digit week year',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1970 &&
      Number(segment) <= 9999
    )
  },
  // {
  //   format: 'gg',
  //   example: '14',
  //   formal: '',
  //   description: 'Locale 2 digit week year',
  //   validator: (value, segment, token) => (
  //   )
  // },
  {
    format: ['w', 'ww'],
    example: '1..53',
    description: 'Locale week of year',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1 &&
      Number(segment) <= 53
    )
  },
  {
    format: 'e',
    example: '0..6',
    description: 'Locale day of week',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 0 &&
      Number(segment) <= 6
    )
  },
  // {
  //   format: 'ddd dddd	',
  //   example: 'Mon...Sunday	',
  //   description: 'Day name in locale set by moment.locale()',
  //   formal: '',
  //   validator: (value, segment, token) => (
  //   )
  // },
  // {
  //   format: 'GGGG',
  //   example: '2014',
  //   description: 'ISO 4 digit week year',
  //   formal: '',
  //   validator: (value, segment, token) => (
  //   )
  // },
  // {
  //   format: 'GG',
  //   example: '14',
  //   formal: '',
  //   description: 'ISO 2 digit week year',
  //   validator: (value, segment, token) => (
  //   )
  // },
  {
    format: ['W', 'WW'],
    example: '1..53',
    description: 'ISO week of year',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1 &&
      Number(segment) <= 53
    )
  },
  {
    format: 'E',
    example: '1..7',
    description: 'ISO day of week',
    formal: '',
    validator: (value, segment, token) => (
      _.isNumber(segment) &&
      segment.length === token.length &&
      Number(segment) >= 1 &&
      Number(segment) <= 53
    )
  },
];

items.forEach(item => {
  item.type = 'DAY';
});

module.exports = items;
