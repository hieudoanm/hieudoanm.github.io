---
title: 'React Optimization: Bundle'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'React Optimization: Bundle'
---

- Measure: `Webpack Bundle Analyser` - `Lighthouse/Web dev`
- Image compression
- Libraries without tree-shaking
  - Avoid using `export default`, use `export` only to avoid tree shaking
- Using light package alternatives
- A better way to Bundle-Split
  - Vendor bundles: these are bundles installed and imported for use. `node_module` packages
  - The second is our main source bundle, which is the critical code needed to render the application
  - A bunch of other bundles split by routes
- Prefer Functions with Hooks than Classes
