---
title: 'JavaScript - ES6 (ECMAScript 2016)'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript - ES6 (ECMAScript 2016)'
---

### Exponentiation Operator

The **exponentiation** operator (`**`) raises the first operand to the power of the second operand.

```ts
let x = 5;
let z = x ** 2; // result is 25
```

`x ** y` produces the same result as `Math.pow(x, y)`:

```ts
let x = 5;
let z = Math.pow(x, 2); // result is 25
```

### Exponentiation Assignment

The **exponentiation assignment** operator (`**=`) raises the value of a variable to the power of the right operand.

```ts
let x = 5;
x **= 2; // result 25
```
