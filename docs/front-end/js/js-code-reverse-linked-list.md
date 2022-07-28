---
title: 'JavaScript Code: Reverse Linked List'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: Reverse Linked List'
---

```js
class Node {
  // constructor
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  add(element) {
    const node = new Node(element); // Create a node before adding
    let current;
    if (this.head === null)
      //For first element
      this.head = node;
    else {
      // Iterate till the last item and add value
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }
  printList() {
    let curr = this.head;
    let str = '';
    while (curr) {
      str += curr.element + ' ';
      curr = curr.next;
    }
    console.log(str);
  }
  reverseList() {
    let current = this.head;
    let prev = null;
    let next = null;
    while (current != null) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    // The prev will be pointing to last node, which you will point // to head now so if we start printing from head, list will be
    // reversed
    this.head = prev;
  }
}

let ll = new LinkedList();
// adding more elements to the list
ll.add(10);
ll.add(20);
ll.add(30);
ll.add(40);
ll.add(50);
// returns 10 20 30 40 50
ll.printList();
ll.reverseList();
ll.printList();
```
