# Brain.js Best Practices: Basic Usage

Best practices for neural networks in JS with Brain.js — the simple fixed-topology NN conventions for browser/Node. Use when writing, structuring, or reviewing Brain.js — covers net types, training data, options, serialization, and performance.

## Scenario

Use this example as a starting point when applying **brain-js-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Network Types** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import brain from 'brain.js';

const net = new brain.NeuralNetwork(); // feedforward
const lstm = new brain.recurrent.LSTM(); // sequences/text
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
