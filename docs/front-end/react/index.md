---
title: 'React'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'React'
---

### Class Component vs. Functional Component

- Difference syntax
- Before the introduction of hooks, functional components were stateless. However, with React 16.8, you can implement states with the useState hook to create a stateful component (just like the class component).
- Usage
  - Functional components with hooks are concise and more straightforward to code with. They perform exactly as the class component; this implies no difference between the two other than syntax.
  - By using just functional components in your project, you drastically eliminate the need to refactor the class component into a functional component when it grows.
  - Since classes confuse both people and machines, most especially the this keyword, you don't have to worry about this anymore in functional components.
  - No need for unnecessary method binding like we always do in the class component.
  - Sharing stateful logic between components is tedious in a class-based approach.

### `import`

- After compiling, the code we actually get is `return React.createElement`
