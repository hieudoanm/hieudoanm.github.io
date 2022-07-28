---
title: 'JavaScript Code: Find Most Frequent'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: Find Most Frequent'
---

```js
const a = [1, 2, 3, 4, 5, 1, 1, 2];

// count appearance
const count = (arr) => {
  const obj = {};
  for (const item of arr) {
    if (obj.hasOwnProperty(item)) {
      obj[item] += 1;
    } else {
      obj[item] = 1;
    }
  }
  return obj;
};

// k is the numebr of elements that are returned
const findKMostFrequent = (array, k) => {
  const appearances = count(array);

  const list = Object.entries(appearances).sort((a, b) => {
    return b[1] - a[1];
  });

  return list.map((item) => item[0]).splice(0, k);
};

console.log(findKMostFrequent(a, 1));
// Output => [1]

console.log(findKMostFrequent(a, 2));
// Output => [1, 2]
```
