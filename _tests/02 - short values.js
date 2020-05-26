const parser = require('../src/index');

const value = 'Screen Shot 2015-07-09 at 1.33.25 PM';

const results = parser.analyze(value);

console.log(JSON.stringify(results, null, 2));
