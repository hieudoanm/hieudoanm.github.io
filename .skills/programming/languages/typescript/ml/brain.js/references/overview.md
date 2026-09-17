# Overview

Focused reference for **brain-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Brain.js Best Practices

Brain.js is a **simple neural network library for JS** — `new brain.NeuralNetwork()`/`brain.recurrent.LSTM` trained on `input`/`output` arrays with JSON serialization built in. Practical Brain.js leans on **`input`→`output` array mapping (normalize!), training with `tolerance`/`iterations` and observed `error`, and `toJSON`/`fromJSON` for deploying trained nets — plus the pragmatic ceiling: small fixed-topology nets** — it's the HTML5-era simplicity; data normalization and validation are where the craft lives.

---

## 1. Network Types

- **Pick per task:**

```js
import brain from 'brain.js';

const net = new brain.NeuralNetwork(); // feedforward
const lstm = new brain.recurrent.LSTM(); // sequences/text
```

- **`NeuralNetwork` default; `LSTM` for time/text; `KNN`-style only where the API matches.**
- **`brain.networks` extendable — stick to the supported surface.**

---

## 2. Training Data & Format
