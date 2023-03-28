---
title: "JavaScript Code: Memorize"
date: "2021-12-12"
author: "Hieu Doan"
description: "JavaScript Code: Memorize"
---

```js
const memorize = (func) => {
  const cache = {};
  return (...args) => {
    const key = args.join("-");
    if (cache[key]) {
      return cache[key];
    }
    const result = func(...args);
    cache[key] = result;
    return result;
  };
};

const add = (a, b) => {
  console.log("computing");
  return a + b;
};

const memorizeAdd = memorize(add);

console.log(memorizeAdd(1, 2));
console.log(memorizeAdd(3, 4));
console.log(memorizeAdd(1, 2));
```
