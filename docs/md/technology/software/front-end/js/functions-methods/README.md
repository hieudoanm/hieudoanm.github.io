---
title: "JavaScript: Functions - Methods"
date: "2021-12-12"
author: "Hieu Doan"
description: "JavaScript: Functions - Methods"
---

**Regular**

```js
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }
  logName() {
    console.log(this.heroName);
  }
}
const batman = new Hero("Batman");

batman.logName(); // Batman
setTimeout(batman.logName, 1000); // undefined
setTimeout(batman.logName.bind(batman), 1000); // Batman
```

**Arrow**

```js
class Hero {
  constructor(heroName) {
    this.heroName = heroName;
  }
  logName = () => {
    console.log(this.heroName);
  };
}

const batman = new Hero("Batman");

batman.logName(); // Batman
setTimeout(batman.logName, 1000); // Batman
setTimeout(batman.logName.bind(batman), 1000); // Batman
```
