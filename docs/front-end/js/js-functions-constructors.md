---
title: 'JavaScript: Functions - Constructors'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'JavaScript: Functions - Constructors'
---

**Regular** can easily construct objects.

```js
function Car(color) {
  this.color = color;
}
const redCar = new Car('red');
redCar instanceof Car; // => true
```

**Arrow** cannot be used as a constructor.

```js
const Car = (color) => {
  this.color = color;
};
const redCar = new Car('red'); // TypeError: Car is not a constructor
```
