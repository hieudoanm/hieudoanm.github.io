---
name: synaptic-best-practices
description: Best practices for building neural networks in JS with Synaptic — the network-architecture conventions for browser/Node. Use when writing, structuring, or reviewing Synaptic — covers networks, architect objects, training, serialization, and performance.
---

# Synaptic Best Practices

Synaptic is a **JavaScript neural network library** — `new Architect.Perceptron`, `Network`, layers and trainers with a small VM-style API. Practical Synaptic leans on **declarative architect objects for the network shape, `trainer.XOR`-style or custom `network.activate` + `trainer.train` for learning, explicit `toJSON`/`fromJSON` serialization for persistence, and input/output normalization discipline** — the network is a function you train; data into `[0,1]`/normalized in, predictions out.

---

## 1. Network Construction

- **Architect factories for standard shapes:**

```js
import { Architect, Network, Trainer } from "synaptic";

const net = new Architect.Perceptron(2, 4, 1);   // input, hidden, output
const net2 = new Architect.LSTM(3, 5, 1);
```

- **Perceptron/`LSTM`/`Hopfield` per task (feedforward, sequences, associative).**
- **Layer sizes deliberate — depth vs width tuned for the data budget.**

---

## 2. Activation & Prediction

- **`activator` on normalized inputs:**

```js
const out = net.activate([0.1, 0.9]);
```

- **Inputs normalized (scaled to the activation range); outputs interpreted via the same mapping.**
- **Bias/layers config explicit in the architect call; keep the mapping constant across train/predict.**

---

## 3. Training

- **Trainer for supervised learning; data pairs normalized:**

```js
const trainer = new Trainer(net);
trainer.train([
  { input: [0, 0], output: [0] },
  { input: [1, 0], output: [1] },
], { iterations: 5000, error: 0.01, log: 50, rate: 0.1 });
```

- **Small `rate` + iteration cap for stability; watch `error` convergence (not raw iterations).**
- **Training data separate from validation — check generalization on a withheld set.**

---

## 4. Serialization

- **Network state is a plain JSON blob — persist it:**

```js
const json = net.toJSON();
// store json
const restored = Network.fromJSON(json);
```

- **Save/restore round-trips for deployment — never rebuild by re-training at runtime.**
- **Version the network shape with the data schema (inputs/architecture).**

---

## 5. Performance

- **JS engines fine for small nets; batch inference in typed-array loops.**
- **For larger/dense workloads, consider WebAssembly/tensor backends (Synaptic is a learning tool — 100s of params, not millions).**
- **Avoid per-call allocation churn; preallocate activation arrays.**

---

## 6. Testing & Pitfalls

- **Determinism: seed-based trainers/`random` where supported; snapshot tests on JSON.**
- **Watch overfitting — tiny datasets → validation split + early stop.**
- **Document the normalization transform; predictions interpreted in the original scale.**

---

## General Rules of Thumb

- **Architect for shape; normalize in/out.**
- **Trainer holds the loop; watch `error` convergence.**
- **Serialization is the deploy artifact (`toJSON`/`fromJSON`).**
- **Small nets — batch inference; preallocate.**
- **Withheld validation; seeds for determinism.**

---

## Quick-Start Checklist

- [ ] `Architect` network (Perceptron/LSTM) sized to the problem
- [ ] Inputs/outputs normalized to the activation range
- [ ] Trainer with small rate + iteration/error caps; convergence tracked
- [ ] Training/validation split; generalization checked
- [ ] `toJSON`/`fromJSON` persistence; shape versioned
- [ ] Deterministic seeds; normalization documented