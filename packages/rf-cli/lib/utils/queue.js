module.exports = class Queue {
  constructor(arr) {
    this.list = arr;
    this.shift = this.shift.bind(this);
    this.pop = this.pop.bind(this);
    this.size = this.size.bind(this);
  }

  shift() {
    return this.list.shift();
  }

  pop() {
    return this.list.pop();
  }

  size() {
    return this.list.length;
  }
};
