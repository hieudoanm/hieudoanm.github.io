---
title: 'JavaScript: Functions - return'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript: Functions - return'
---

**Regular**

```js
function myFunction() {
  return 42;
}
myFunction(); // => 42

function myEmptyFunction() {
  42;
}
myEmptyFunction(); // => undefined

function myEmptyFunction2() {
  42;
  return;
}
myEmptyFunction2(); // => undefined
```

**Arrow**

```js
const increment = (num) => num + 1;
increment(41); // => 42
```
