// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William


// First in first out (FIFO).

class Queue {
  constructor() {
    this.items = [];
    this.lowestCount = 0;
    this.count = 0;
  }

  // Adding from the front.
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // Removes the last one.
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  peek() {
    return this.items[this.lowestCount];
  }

  size() {
    // console.log(this.count);
    return this.count - this.lowestCount;
  }

  clear() {
    this.count = 0;
    this.items = [];
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}

module.exports = {
  Queue: Queue,
};
