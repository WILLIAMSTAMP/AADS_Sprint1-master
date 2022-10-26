// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William, Neil

/* First in first out (FIFO). */

class Queue {
  constructor() {
    this.items = [];
    this.lowestCount = 0;
    this.count = 0;
  }

  /* Adding from the front. */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  /* Removes the last one from queue. */
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  /* checks to see if queue is empty */
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }
  /* peeks in queue */
  peek() {
    return this.items[this.lowestCount];
  }
  /* checks size of queue */
  size() {
    // console.log(this.count);
    return this.count - this.lowestCount;
  }
  /* clears the counter to zero and emptys array */
  clear() {
    this.count = 0;
    this.items = [];
    this.lowestCount = 0;
  }
  /* checks to see and convets to string iterates over items */
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
/* modules for export */
module.exports = {
  Queue: Queue,
};
