---
title: 'JavaScript Code: Sleep'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: Sleep'
---

```ts
const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const count = async () => {
  for (let i = 1; i <= 10; i++) {
    await sleep(3000);
    console.log(`${i} seconds`);
  }
};
// Delay for 1 seconds
// Output: 1 seconds
// Delay for 1 seconds
// Output: 2 seconds
// Delay for 1 seconds
// Output: 3 seconds
// Delay for 1 seconds
// Output: 4 seconds
// Delay for 1 seconds
// Output: 5 seconds
// Delay for 1 seconds
// Output: 6 seconds
// Delay for 1 seconds
// Output: 7 seconds
// Delay for 1 seconds
// Output: 8 seconds
// Delay for 1 seconds
// Output: 9 seconds
// Delay for 1 seconds
// Output: 10 seconds
```
