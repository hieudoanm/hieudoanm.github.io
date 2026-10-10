# Synaptic Best Practices: Basic Usage

Best practices for building neural networks in JS with Synaptic — the network-architecture conventions for browser/Node. Use when writing, structuring, or reviewing Synaptic — covers networks, architect objects, training, serialization, and performance.

## Scenario

Use this example as a starting point when applying **synaptic-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Network Construction** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```js
import { Architect, Network, Trainer } from 'synaptic';

const net = new Architect.Perceptron(2, 4, 1); // input, hidden, output
const net2 = new Architect.LSTM(3, 5, 1);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
