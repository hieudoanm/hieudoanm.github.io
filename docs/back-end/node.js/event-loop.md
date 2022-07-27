---
title: 'Node.js: Event Loop'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'Node.js: Event Loop'
---

- Call Stack - store and invoke function
- Queue
- Event Loop job is to get first function from event queue and push it to callstack - last in first out
- Web API

- Heap <=> Call Stack => Web API => Queue

```ts
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

**Example 1**

```ts
const heyOne = () => console.log('First');
const heyTwo = () => setTimeout(() => console.log('Second'), 0);
const heyThree = () => console.log('Third');

heyTwo();
heyOne();
heyThree();

// Output: First
// Output: Third
// Output: Second
```

- Order
  - `heyTwo();` => push to queue
  - `setTimeout();` => push call back to web api
  - `heyOne();` => push to queue
  - `console.log('First');` => push to queue
  - `heyThree();` => push to queue
  - `console.log('Third');` => push to queue
  - `console.log('Second');` => push to queue
- Explained
  1. We invoke `heyTwo`. `heyTwo` returns a `setTimeout` function.
  2. The callback we passed to `setTimeout` gets added to the `Web API`, the `setTimeout` function and `heyTwo` get popped off the callstack.
  3. The timer runs, in the meantime `heyOne` gets invoked and logs `First`. `heyOne` returns (undefined), `heyThree` gets invoked, and the callback gets added to the queue.
  4. `heyThree` logs Third. The event loop sees the callstack is empty after `heyThree` returned, after which the callback gets added to the call stack.
  5. The callback logs Second.

**Example 2**

```js
setTimeout(() => {
  console.log(1);
}, 0);

new Promise((res) => {
  console.log(2);
  res();
}).then(() => {
  console.log(3);
});

console.log(4);

// Output: 2
// Output: 4
// Output: 3
// Output: 1
```
