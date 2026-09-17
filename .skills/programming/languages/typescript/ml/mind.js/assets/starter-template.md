# Mind.js Best Practices: Starter Template

A reusable starting point derived from the **1. Mind Instances** section of [Mind.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
import Mind from 'mind.js';

const mind = new Mind({ activator: 'sigmoid' });
mind.learn(
  [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
  ],
  { iterations: 1000, learningRate: 0.1 }
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
