---
title: 'JavaScript - ES6 (ECMAScript 2015)'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript - ES6 (ECMAScript 2015)'
---

### let

The `let` keyword allows you to declare a variable with block scope.

```ts
var x = 10;
// Here x is 10
{
  let x = 2;
  // Here x is 2
}
// Here x is 10
```

### const

The `const` keyword allows you to declare a constant (a JavaScript variable with a constant value).

```ts
var x = 10;
// Here x is 10
{
  const x = 2;
  // Here x is 2
}
// Here x is 10
```

### Arrow Functions

- Arrow functions allows a short syntax for writing function expressions.
- Arrow functions do not have their own this. They are not well suited for defining object methods.
- Arrow functions are not hoisted. They must be defined before they are used.
- Using `const` is safer than using `var`, because a function expression is always a constant value.

```ts
// ES5
var x = function (x, y) {
  return x * y;
};

// ES6
const x = (x, y) => x * y;
```

### For/Of Loop

- The JavaScript `for/of` statement loops through the values of an iterable objects.
- `for/of` lets you loop over data structures that are iterable such as Arrays, Strings, Maps, NodeLists, and more.

```ts
const cars = ['BMW', 'Volvo', 'Mini'];
let text = '';

for (let x of cars) {
  text += x + ' ';
}
```

```ts
let language = 'JavaScript';
let text = '';

for (let x of language) {
  text += x + ' ';
}
```

### Map Objects

### Set Objects

- A JavaScript Set is a collection of unique values.
- Each value can only occur once in a Set.
- A Set can hold any value of any data type.

### Class

- A JavaScript class is **not** an object.
- It is a **template** for JavaScript objects.

### Promises

### Symbols

### Default Parameter

### Function Rest Parameter

### String.includes()

### String.startsWith()

### String.endsWith()

### Array.from()

### Array.keys()

### Array.find()

### Array.findIndex()
