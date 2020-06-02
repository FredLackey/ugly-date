const parser = require('../src/index');

const values = [
  // 'Screen Shot 2016-07-29 at 6.11',
  // 'Screenshot 2014-09-07 13.36.45',
  'Snapshot-3208-2016-10-11-08-31-16'
];

values.forEach(value => {
  const results = parser.analyze(value);
  if (!results.hasDate || !results.hasTime) {
    console.log('Invalid!');
  } else {
    console.log(JSON.stringify(results, null, 2));
  }
});

