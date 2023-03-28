---
title: "JavaScript: Functions - this"
date: "2021-12-12"
author: "Hieu Doan"
description: "JavaScript: Functions - this"
---

- `this` value inside a regular function is dynamic and depends on the invocation.
- But `this` inside the arrow function is bound lexically and equals to `this` of the outer function.

**Regular**

```js
function myFunction() {
  console.log(this);
}
// Simple invocation
myFunction(); // logs global object (window)
```

```js
const myObject = {
  method() {
    console.log(this);
  },
};
// Method invocation
myObject.method(); // logs myObject
```

```js
function myFunction() {
  console.log(this);
}
const myContext = { value: "A" };
myFunction.call(myContext); // logs { value: 'A' }
myFunction.apply(myContext); // logs { value: 'A' }
```

```js
function MyFunction() {
  console.log(this);
}
new MyFunction(); // logs an instance of MyFunction
```

**Arrow**

```js
const myObject = {
  myMethod(items) {
    console.log(this); // logs myObject
    const callback = () => {
      console.log(this); // logs myObject
    };
    items.forEach(callback);
  },
};
```
