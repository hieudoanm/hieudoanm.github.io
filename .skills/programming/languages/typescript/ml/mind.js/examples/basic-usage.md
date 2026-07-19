# Mind.js Best Practices: Basic Usage

Best practices for building neural networks in JS with Mind.js — the lightweight volatile NN conventions for browser/Node. Use when writing, structuring, or reviewing Mind.js — covers net construction, training, activation, serialization, and pitfalls.

## Scenario

Use this example as a starting point when applying **mind-js-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Mind Instances** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
