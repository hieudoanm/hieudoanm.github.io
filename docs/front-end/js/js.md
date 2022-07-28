---
title: 'JavaScript (JS)'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript'
---

### async/await

- History:
  - In the past, we depend on `callbacks` to deal with asynchronous, which results in `callback hell`.
  - In ES6, we got `.then()` which makes the code cleaner.
  - In ES7, we got `async/await` which make everything better.
- Ideas:
  - `async/await` helps make JS code easier to work with and understand.
  - It is built upon `Promises` and compatible with all `API` from `Promises`.
  - `async` turns a normal function into a `promise` function and allows the usage of `await`.
  - `await` is placed before a `promise` function and will wait until the `promise` complete.
  - Use `try/catch` to catch the unexpected error.

### Closures

- Lexical scoping

```js
function init() {
  var name = 'Mozilla'; // name is a local variable created by init
  function displayName() {
    // displayName() is the inner function, a closure
    alert(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

- Closure

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

### Polyfill Bind

### `this`
