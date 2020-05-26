module.exports = class Sequence {
  constructor(root) {
    this.root   = root;
    this.steps  = [];
  }
  
  addStep(candidate, position, value, parent) {
    const step = new Step(candidate, position, value, parent);
    this.steps.push(step);
  }
}