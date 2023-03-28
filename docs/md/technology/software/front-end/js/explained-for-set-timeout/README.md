---
title: "JavaScript Explained: for with setTimeout"
date: "2021-12-12"
author: "Hieu Doan"
description: "JavaScript Explained: for with setTimeout"
---

### `setTimeout`

```ts
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Output: 5
// Output: 5
// Output: 5
// Output: 5
// Output: 5
```

- `setTimeout` method is asynchronous so that JavaScript runs the asynchronous code once the synchronous code execution is completed.
- At the time of synchronous code (for loop) execution is completed the variable i value is 5 so that we can see 5 inside our console.

```ts
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Output: 1
// Output: 2
// Output: 3
// Output: 4
// Output: 5
```

- `let` keyword because it creates a new variable on each iteration but `var` keyword is using the same variable throughout the for loop execution.

### Solution

```ts
for (var i = 0; i < 5; i++) {
  (function (val) {
    //val is parameter
    setTimeout(function () {
      console.log(val);
    }, 1000);
  })(i); // i is argument
}

// -- > output  0,1,2,3,4
```

**OR**

```ts
for (var i = 0; i < 5; i++) {
  function timeout(val) {
    setTimeout(function () {
      console.log(val);
    }, 1000);
  }
  timeout(i);
}
```
