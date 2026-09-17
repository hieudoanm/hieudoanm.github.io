# Brain.js Best Practices: Starter Template

A reusable starting point derived from the **2. Training Data & Format** section of [Brain.js Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
net.train(
  [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
  ],
  { iterations: 5000, errorThresh: 0.01, log: false }
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
