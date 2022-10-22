// Sprint 1 for algorithms class
// Due October 31st 2022
// Group members: Chris, Mark, William


// Last in first out (LIFO).
class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  // Adding an element to the stack.
  push(element) {
    this.items[this.count] = element;
    console.log(`${element} added to position ${this.count}`);
    this.count += 1;
    return this.count - 1;
  }

  // Removing an element from the back of the stack (Front).
  pop() {
    if (this.count === 0) {
      return undefined;
    }
    let deleteItem = this.items[this.count - 1];
    this.count -= 1;
    console.log(`${deleteItem} deleted from stack`);
    return deleteItem;
  }

  // Checking the element at the top of the stack.
  peek() {
    console.log(`The top element is ${this.items[this.count - 1]}`);
    return this.items;
  }

  isEmpty() {
    console.log(this.count === 0 ? `stack is empty` : `stack is not empty`);
    return this.count == 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
  }
}

module.exports = {
  Stack: Stack,
};
