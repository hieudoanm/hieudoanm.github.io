---
title: 'JavaScript Code: Throttle'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: Throttle'
---

```js
const throttle = (fn, delay) => {
  let lastCalled = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - lastCalled < delay) {
      return;
    }
    lastCalled = now;
    return fn(...args);
  };
};

const logTimestamp = () => {
  const now = Date.now();
  console.log(`Message at ${now}`);
};

const throttleLog = throttle(logTimestamp, 1000);
```

- If two `throttleLog` functions is called within one second, the second will not be invoked.
