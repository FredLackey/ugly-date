const _ = require('../utils');

const date  = require('./date');
const day   = require('./day');
const time  = require('./time');

const getSegments = pattern => {
  const segments = [];
  const chars = pattern.split('');
  let curSegment = '';
  let lastChar = '';
  let curChar = '';
  let isAlpha = null;
  let isSame = null;
  for (let i = 0; i < chars.length; i += 1) {
    curChar = chars[i];
    isAlpha = _.ALPHANUMERIC.indexOf(curChar.toUpperCase()) >= 0;
    isSame  = lastChar && (curChar === lastChar);
    if (!curSegment && !isAlpha) {
      continue;
    }    
    if (!curSegment && isAlpha) {
      curSegment = curChar;
      lastChar = curChar;
      continue;
    }
    if (isSame) {
      curSegment += curChar;
      continue;
    }

    if (curSegment) {
      segments.push(curSegment);
    }

    curSegment = (isAlpha ? curChar : '');
    lastChar = (isAlpha ? curChar : '');
  }
  if (curSegment) {
    segments.push(curSegment);
  }
  return segments;
}
const proveCandidates = (value, candidates) => {
  
  candidates.filter(candidate => (candidate && candidate.pattern)).forEach(candidate => {

    candidate.segments = [];
    
    const patternSegments = getSegments(candidate.pattern).filter(_.isValidString);
    patternSegments.forEach(patternSegment => {

      const patternSegmentValidators = [].concat(date.validators, day.validators, time.validators)
        .filter(x => (x && x.format && (
          (x.format === patternSegment) ||
          (x.format instanceof Array && x.format.includes(patternSegment))
        )));

      if (patternSegmentValidators.length > 1) {
        throw new Error(`Excessive validators found for segment: ${patternSegment}`)
      }
      if (patternSegmentValidators.length !== 1) {
        throw new Error(`Inadequate validators found for segment: ${patternSegment}`)
      }

      const validPositions = [];
      for (let v = 0; v < value.length; v += 1) {
        
        let segment = value.substr(v);
        if (segment.length < patternSegment.length) {
          break;
        }
        if (segment.length > patternSegment.length) {
          segment = segment.substr(0, patternSegment.length);
        }
        
        const isValid = patternSegmentValidators[0].validator(value, segment, patternSegment);
        if (!isValid) {
          continue;
        }
        
        validPositions.push(v);
      }

      candidate.segments.push({
        segment : patternSegment,
        validAt : validPositions
      })
    });
  });
}

const findTrivial = items => {
  items.forEach(item => {
    item.trivials = [];
  });
  items.forEach(item => {
    item.trivials = items.filter(other => (
      (other !== item) &&
      other.pattern.length > item.pattern.length &&
      other.pattern.indexOf(item.pattern) >= 0
    ));
  });
}
const locateCadidates = (hash, items) => {
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    item.positions = [];
    for (let h = 0; h < hash.length; h += 1) {
      const snip  = hash.substr(h);
      if (snip.length < item.hash.length) {
        break;
      }
      const pos   = snip.indexOf(item.hash);
      if (pos === 0) {
        item.positions.push(h);
      }
    }
  }
}
const findCandidates = value => {
  const hash = _.toCharMask(value);
  const patterns = [].concat(
    date.patterns,
    day.patterns,
    time.patterns
  );
  const valid = patterns.filter(_.isValidString);
  let items = valid.map(pattern => ({
    pattern,
    hash : _.toCharMask(pattern)
  }));
  findTrivial(items);
  locateCadidates(hash, items);
  items = items.filter(item => (
    item && item.positions.length > 0
  ));
  proveCandidates(value, items);
  items = items.filter(item => {
    const patternSegments = getSegments(item.pattern).filter(_.isValidString);
    const provenSegments = item.segments.filter(seg => (seg && seg.validAt.length > 0));
    return (provenSegments.length === patternSegments.length);
  });
  return items;
};

const hasTrivial = items => {
  findTrivial(items);
  return items
    .filter(item => (item && item.trivials.length > 0))
    .length > 0;
}
const removeTrivial = items => {
  findTrivial(items);
  return items.filter(x => (x && x.trivials.length === 0));
}
const pruneTrivial = items => {
  let result = [].concat(items).filter(x => (x && x.pattern));
  while (hasTrivial(result)) {
    result = removeTrivial(result);
  }
  return result;
}

module.exports = {
  findCandidates,
  pruneTrivial
};
