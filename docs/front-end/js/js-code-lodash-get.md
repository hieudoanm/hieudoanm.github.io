---
title: 'JavaScript Code: lodash.get'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript Code: lodash.get'
---

```js
const getValue = () => {};

const get = (object, path, defaultValue) => {
  let keys = path;
  if (typeof keys === 'string') {
    keys = keys.replace(/\[/g, '.').replace(/\]/g, '').split('.');
  }
  const first = keys.shift();
  if (!object.hasOwnProperty(first)) {
    return defaultValue;
  }
  return get(object[key], keys, defaultValue);
};

const object = { a: [{ b: { c: 3 } }] };

console.log(_.get(object, 'a[0].b.c')); // 3
console.log(_.get(object, ['a', '0', 'b', 'c'])); // 3
console.log(_.get(object, 'a.b.c', 'default')); // default
```
