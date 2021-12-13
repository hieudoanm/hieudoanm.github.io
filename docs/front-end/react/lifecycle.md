---
title: 'React Lifecycle'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'React Lifecycle'
---

```jsx
import React from 'react';

const App = () => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    // mounting and updating
    console.log('update 1');
    return () => {
      // unmount
      console.log('unmount 2', val);
    };
  }, [val]);

  console.log('mount 3');

  // Output:
  // mount 3
  // update 1
  // mount 3
  // unmount 2 0
  // update 1

  return (
    <div>
      <h1>React Lifecycle</h1>
      <h2>Update state: {value}</h2>
      <button onClick={onClick}>Click</button>
    </div>
  );
};
```
