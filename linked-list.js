/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val); // set currentNode

    // New / Empty Linked List: No Head or Tail set yet!
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }

    // Linked List with at least one item: Set new tail!
    this.tail.next = newNode;
    this.tail = newNode;

    this.length++; // increment length of list
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val); // set currentNode

    // New / Empty Linked List
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }

    newNode.next = this.head; // set newNode.next to current head - keep the chain alive!
    this.head = newNode; // set LinkedList head to newNode
    this.length++; // increment length of list
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) {
      return undefined; // List is empty
    }

    if (this.length === 1) {
      // If there's only one item in the list, remove it
      const val = this.head.val;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return val;
    }

    // Find the second-to-last node
    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next;
    }

    // Remove and update the tail
    const val = this.tail.val;
    current.next = null;
    this.tail = current;
    this.length--;
    return val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (this.length === 0) {
      return undefined; // List is empty
    }

    const val = this.head.val;
    this.head = this.head.next;
    this.length--;

    if (this.length === 0) {
      // If there are no more items, update the tail
      this.tail = null;
    }

    return val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx >= this.length) {
      return undefined; // Invalid index
    }

    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    return current.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx >= this.length) {
      return false; // Invalid index
    }

    let current = this.head;
    for (let i = 0; i < idx; i++) {
      current = current.next;
    }

    current.val = val;
    return true;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) {
      return false; // Invalid index
    }

    if (idx === 0) {
      this.unshift(val); // Insert at the beginning
      return true;
    }

    if (idx === this.length) {
      this.push(val); // Insert at the end
      return true;
    }

    const newNode = new Node(val);
    let current = this.head;
    for (let i = 0; i < idx - 1; i++) {
      current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.length++;
    return true;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      return undefined; // Invalid index
    }

    if (idx === 0) {
      return this.pop(); // Remove the last item, in this case it is the first one!
    }

    let current = this.head;
    for (let i = 0; i < idx - 1; i++) {
      current = current.next;
    }

    const removedNode = current.next;
    current.next = current.next.next;

    if (idx === this.length - 1) {
      this.tail = current;
    }

    this.length--;
    return removedNode.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0; // List is empty
    }

    let current = this.head;
    let sum = 0;

    while (current) {
      sum += current.val;
      current = current.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
