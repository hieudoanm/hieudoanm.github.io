---
title: 'React Optimization: Performance'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'React Optimization: Performance'
---

- Use the Production Build
  - Use [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- Profiling Components with the DevTools Profiler
- Virtualize Long Lists
  - If your application renders long lists of data (hundreds or thousands of rows), we recommend using a technique known as "windowing". This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.
- Avoid Reconciliation
  - If you know that in some situations your component doesn't need to update, you can return false from shouldComponentUpdate instead, to skip the whole rendering process, including calling render() on this component and below.
  - Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate. It only does a shallow comparison, so you can't use it if the props or state may have been mutated in a way that a shallow comparison would miss.
- Use `React.Fragments` to avoid additional HTML element wrappers.
- Avoid Inline Function Definition in the Render Function.
- Avoid using Index as Key for map
- Avoid Props in Initial States
- Avoid spreading props on DOM elements
- Memoize React Components (stateless component which will get re-render when parameters are the same)
- CSS Animations Instead of JS Animations
