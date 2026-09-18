---
name: brain-js-best-practices
description: Best practices for neural networks in JS with Brain.js — the simple fixed-topology NN conventions for browser/Node. Use when writing, structuring, or reviewing Brain.js — covers net types, training data, options, serialization, and performance.
---

# Brain.js Best Practices

Brain.js is a **simple neural network library for JS** — `new brain.NeuralNetwork()`/`brain.recurrent.LSTM` trained on `input`/`output` arrays with JSON serialization built in. Practical Brain.js leans on **`input`→`output` array mapping (normalize!), training with `tolerance`/`iterations` and observed `error`, and `toJSON`/`fromJSON` for deploying trained nets — plus the pragmatic ceiling: small fixed-topology nets** — it's the HTML5-era simplicity; data normalization and validation are where the craft lives.

---

## 1. Network Types

- **Pick per task:**

```js
import brain from "brain.js";

const net = new brain.NeuralNetwork();            // feedforward
const lstm = new brain.recurrent.LSTM();          // sequences/text
```

- **`NeuralNetwork` default; `LSTM` for time/text; `KNN`-style only where the API matches.**
- **`brain.networks` extendable — stick to the supported surface.**

---

## 2. Training Data & Format

- **Inputs/outputs as arrays of numbers (normalized, not raw booleans only):**

```js
net.train([
  { input: [0, 0], output: [0] },
  { input: [1, 0], output: [1] },
], { iterations: 5000, errorThresh: 0.01, log: false });
```

- **Normalization to `[0,1]`/`[-1,1]` — decode identically at predict.**
- **Class imbalance: more samples for rarer classes; validation split withheld.**

---

## 3. Training Options & Monitoring

- **Options deliberate: `iterations`, `errorThresh`, `learningRate`, `log`:**

```js
net.train(data, { iterations: 20000, errorThresh: 0.005, learningRate: 0.2, log: (e) => track(e.error) });
```

- **Watch `error` curve — stop when it flattens (use errorThresh + iteration cap).**
- **Small learning rates with more iterations beat spikes; seeded reproducibility documented.**

---

## 4. Serialization & Deployment

- **The trained net is a JSON object:**

```js
const model = net.toJSON();
const deployed = new brain.NeuralNetwork().fromJSON(model);
```

- **Save the JSON as a deploy artifact; `fromJSON` loads without retraining.**
- **Input schema + normalization transform travels with the model (versioned).**

---

## 5. Performance & Limits

- **Brain.js fits small fixed-topology nets — not ResNet-scale.**
- **Batch predictions in typed arrays; avoid per-call object churn.**
- **For heavier duty switch to TensorFlow.js/tfjs-wasm; document the migration trigger.**

---

## 6. Testing & Pitfalls

- **Determinism: same seeds where supported; compare `error` curves in tests.**
- **Golden tests: serialize → load → equal outputs on fixed inputs.**
- **Overfitting: hidden-layer count + validation, not raw accuracy on training.**

---

## General Rules of Thumb

- **`input`/`output` arrays normalized; decode consistently.**
- **Watch `error`; tolerance + iteration caps.**
- **`toJSON`/`fromJSON` = deploy path.**
- **Small nets; typed-array batching.**
- **Withheld validation; schema + normalization versioned.**

---

## Quick-Start Checklist

- [ ] `brain.NeuralNetwork`/`LSTM` per task; topology deliberate
- [ ] Inputs/outputs normalized; decode identical at predict
- [ ] `train` with iterations/errorThresh; error curve tracked
- [ ] Training/validation split; generalization observed
- [ ] `toJSON`/`fromJSON` persistence; schema versioned
- [ ] Deterministic seeds; golden output tests