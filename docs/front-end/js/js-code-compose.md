---
title: 'JavaScript: Functions - Compose'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript: Functions - Compose'
---

```js
function compose() {
  var fns = arguments;

  return function (result) {
    for (var i = fns.length - 1; i > -1; i--) {
      result = fns[i].call(this, result);
    }

    return result;
  };
}

var number = compose(Math.round, parseFloat);

number('72.5'); //=> 73
```
