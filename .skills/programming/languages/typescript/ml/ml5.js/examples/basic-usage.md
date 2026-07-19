# ml5.js Best Practices: Basic Usage

Best practices for machine learning in the browser with ml5.js — the friendly-ML conventions for education and creative coding. Use when writing, structuring, or reviewing ml5.js — covers models (image classification, pose, transfer learning), load/ready, inference, and browser constraints.

## Scenario

Use this example as a starting point when applying **ml5-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Loading Models** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
const classifier = ml5.imageClassifier('MobileNet', () => {
  console.log('model loaded');
});
// or
const lib = ml5.imageClassifier('MobileNet');
await lib.load(); // explicit await world
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
