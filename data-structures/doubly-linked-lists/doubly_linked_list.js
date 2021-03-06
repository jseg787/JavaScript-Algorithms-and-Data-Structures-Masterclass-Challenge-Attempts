class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      // if the list is empty make the head and tail the new
      this.head = newNode;
      this.tail = newNode;
    } else {
      // otherwise make tail.next the new node, make the newNode
      // prev be the current tail, then update the tail to be the
      // newNode
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    // return the DoublyLinkedList
    return this;
  }

  pop() {
    if (this.length === 0) {
      return undefined;
    }

    const poppedNode = this.tail;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // update the tail to be the tails prev
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }

  shift() {
    if (this.length === 0) {
      return undefined;
    }

    const shiftedNode = this.head;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = shiftedNode.next;
      this.head.prev = null;
      shiftedNode.next = null;
    }
    this.length--;
    return shiftedNode;
  }

  unshift(val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let count, current;

    if (index <= this.length / 2) {
      // if the index requested is less than half the length,
      // start searching in the first half of the list
      count = 0;
      current = this.head;
      while (count !== index) {
        current = current.next;
        count++;
      }
    } else {
      // Otherwise start at the end
      count = this.length - 1;
      current = this.tail;
      while (count !== index) {
        current = current.prev;
        count--;
      }
    }
    return current;
  }

  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode !== null) {
      foundNode.val = val;
      return true;
    } else {
      return false;
    }
  }

  insert(index, val) {
    if (index < 0 || index > this.length) {
      return false;
    }
    if (index === 0) {
      this.unshift(val);
      return true;
    }
    if (index === this.length) {
      this.push(val);
      return true;
    }

    const node = new Node(val);
    const prevNode = this.get(index - 1);
    const nextNode = prevNode.next;

    prevNode.next = node;
    node.prev = prevNode;
    nextNode.prev = node;
    node.next = nextNode;
    this.length++;
    return true;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    if (index === 0) {
      return this.shift();
    }
    if (index === this.length - 1) {
      return this.pop();
    }

    const removedNode = this.get(index);

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;
    return removedNode
  }
}
