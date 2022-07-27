---
title: 'React: Render'
date: '2021-12-12'
author: 'Hieu Doan'
description: 'React: Render'
---

Rendering is a process that is triggered by a change of state in some component of your application, when a state change occurs React.

- It will collect from the root of your App all the components that requested a re-render because their state or their props changed.

Reconciliation: Once the re-rendering has happened, React has the context of two versions of the React.createElement output, the version executed before the state change occurred, and the version executed after the state has changed.

- Elements that changed type must be recreated.
- Changes within the attributes of an element are replaced, without unmounting the element.
- Upgrades within the element's children recreate all children
- Updates within child elements that use `key` as attributes are compared and only new items are represented.

Commit: After React calculated all the changes that should be made in the application tree. `react-dom` appears for the browser and react-native for the mobile platforms, which make the modifications to the browser or mobile app API (finally! 🥳).
