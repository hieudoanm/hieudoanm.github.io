---
title: 'JavaScript - ES6 (ECMAScript 2017)'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript - ES6 (ECMAScript 2017)'
---

### String padding

ECMAScript 2017 added two String methods: `padStart` and `padEnd` to support padding at the beginning and at the end of a string.

```ts
let str = '5';
str = str.padStart(4, 0);
// result is 0005
```

```ts
let str = '5';
str = str.padEnd(4, 0);
// result is 5000
```

### Object.entries

The `Object.entries()` method returns an array of the key/value pairs in an object:

```ts
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue'
};

Object.entries(person), null, 2);

// [
//   ['firstName', 'John'],
//   ['lastName', 'Doe'],
//   ['age', 50],
//   ['eyeColor', 'blue']
// ];
```

### Object.values

`Object.values` are similar to `Object.entries`, but returns a single dimension array of the object values:

```ts
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 50,
  eyeColor: 'blue',
};

Object.values(person);

// ['John', 'Doe', 50, 'blue'];
```

### async functions
