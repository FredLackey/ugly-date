const _ = require('../../utils');

const items = [
  {
    format: 'gggg',
    example: '2014',
    description: 'Locale 4 digit week year',
    validator: (value) => (
      _.isNumber(value) &&
      `${value}`.length === 4 &&
      Number(value) >= 1970 &&
      Number(value) <= 9999
    )
  },
  // {
  //   format: 'gg',
  //   example: '14',
  //   description: 'Locale 2 digit week year',
  //   validator: (value) => (
  //   )
  // },
  {
    format: 'w ww	',
    example: '1..53	',
    description: 'Locale week of year',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 1 &&
      Number(value) <= 53
    )
  },
  {
    format: 'e',
    example: '0..6	',
    description: 'Locale day of week',
    validator: (value) => (
      _.isNumber(value) &&
      `${value}`.length === 1 &&
      Number(value) >= 0 &&
      Number(value) <= 6
    )
  },
  // {
  //   format: 'ddd dddd	',
  //   example: 'Mon...Sunday	',
  //   description: 'Day name in locale set by moment.locale()
  //   ',
  //   validator: (value) => (
      
  //   )
  // },
  // {
  //   format: 'GGGG',
  //   example: '2014',
  //   description: 'ISO 4 digit week year
  //   ',
  //   validator: (value) => (
      
  //   )
  // },
  // {
  //   format: 'GG',
  //   example: '14',
  //   description: 'ISO 2 digit week year
  //   ',
  //   validator: (value) => (
      
  //   )
  // },
  {
    format: 'W WW	',
    example: '1..53	',
    description: 'ISO week of year',
    validator: (value) => (
      _.isNumber(value) &&
      [1, 2].includes(`${value}`.length) &&
      Number(value) >= 1 &&
      Number(value) <= 53
    )
  },
  {
    format: 'E',
    example: '1..7	',
    description: 'ISO day of week',
    validator: (value) => (
      _.isNumber(value) &&
      `${value}`.length === 1 &&
      Number(value) >= 1 &&
      Number(value) <= 53
    )
  },
];

items.forEach(item => {
  item.type = 'DAY';
});

module.exports = items;
