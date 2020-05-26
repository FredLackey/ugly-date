const _     = require('../utils');
const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const all = [].concat(date, day, time).filter(_.isValidObject);

// const toTokens = value => {
//   if (!_.isAlphanumeric(value)) { 
//     return null; 
//   }
//   const chars  = value.split('');
//   const tokens = [];
//   const token  = '';
//   for (let i = 0; i < chars.length; i += 1) {
//     if (!token || token.value.toUpperCase()[token.value.length - 1 ] === ch.toUpperCase()) {      
//       token.token += ch;
//       token.pos
//       continue;
//     }
//     tokens.push({
//       token   : token,
//       position: 
//     });
//     token = ch;
//   });
//   if (token) { tokens.push(token); }
//   return tokens;
// }

const validate = (value, locations) => {
 
  [].concat(locations).filter(x => (x && x.patternMask && x.segments && x.segments.pattern.length > 0)).forEach(location => {
    let count = 0;
    for (let i = 0; i < location.segments.pattern.length; i += 1) {

      if (_.isSeparators(location.segments.pattern[i])) {
        continue;
      }
      if (_.isEmpty(location.segments.pattern[i])) {
        continue;
      }
      
      const tokens = _.toTokenList(location.segments.pattern[i]);
      if (tokens.length > 1) {
        console.log(`tokens: ${tokens.length}`);
      }

      const pastTokens = [];
      tokens.forEach(token => {

        const position    = pastTokens.join('').length;
        const segment     = location.segments.value[i].substr(position, token.length);
        const validators  = all.filter(x => (x && (
          x.format === token || 
          (x.format instanceof Array && x.format.includes(token))
        )));
        if (validators.length === 0) {
          location.error = new Error(`Inadequate validators for pattern: ${token}`);
          return;
        }
        if (validators.length > 1) {
          location.error = new Error(`Excessive validators for pattern: ${token}`);
          return;
        }
        
        // (value, segment, token)
        if (validators[0].validator(value, segment, token)) {
          count += 1;
        } else {
          location.isValid = false;
        }

        pastTokens.push(token);
      })
    }
    location.isValid = (count > 0) && location.isValid !== false && !location.error;
  });
};

module.exports = {
  validate
};
