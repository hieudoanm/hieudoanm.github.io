# Synaptic Best Practices: Starter Template

A reusable starting point derived from the **3. Training** section of [Synaptic Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```js
const trainer = new Trainer(net);
trainer.train(
  [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
  ],
  { iterations: 5000, error: 0.01, log: 50, rate: 0.1 }
);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
