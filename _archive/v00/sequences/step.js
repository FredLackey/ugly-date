module.exports = class Step {

  constructor(candidate, position, value, parent) {
    this.candidate = candidate;
    this.parent = parent;
    this.position = position;
    this.value  = value;
  }

  get snippet() {
    const result = this.value.substr(this.position);
    if (candidate.pattern.length > result.length) {
      return null;
    }
    return result;
  }
  
  toPattern(delimter = ' ') {
    return [
      (this.parent ? this.parent.toString() : ''),
      this.candidate.pattern
    ].join(delimter);
  }
  
  toValue(delimter = ' ') {
    return [
      (this.parent ? this.parent.toValue() : ''),
      this.snippet
    ].join(delimter);
  }
}
