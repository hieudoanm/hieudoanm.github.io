---
title: 'JavaScript - Functional Programming'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript - Functional Programming'
---

### Imperative vs. Functional Programming

Imperative

```ts
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function getOdds(arr) {
  let odds = [];
  for (let i = 0; i < arr.length + 1; i++) {
    if (i % 2 !== 0) {
      odds.push(i);
    }
  }
  return odds;
}

console.log(getOdds(arr)); // logs [1, 3, 5, 7, 9]
```

```ts
function getOdds2(arr) {
  return arr.filter((num) => num % 2 !== 0);
}

console.log(getOdds2(arr)); // logs [1, 3, 5, 7, 9]

const getOdds3 = (arr) => arr.filter((num) => num % 2 !== 0);

console.log(getOdds3(arr)); // logs [1, 3, 5, 7, 9]
```
