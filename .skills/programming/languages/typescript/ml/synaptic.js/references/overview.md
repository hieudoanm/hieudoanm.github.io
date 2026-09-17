# Overview

Focused reference for **synaptic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Synaptic Best Practices

Synaptic is a **JavaScript neural network library** — `new Architect.Perceptron`, `Network`, layers and trainers with a small VM-style API. Practical Synaptic leans on **declarative architect objects for the network shape, `trainer.XOR`-style or custom `network.activate` + `trainer.train` for learning, explicit `toJSON`/`fromJSON` serialization for persistence, and input/output normalization discipline** — the network is a function you train; data into `[0,1]`/normalized in, predictions out.

---

## 1. Network Construction

- **Architect factories for standard shapes:**

```js
import { Architect, Network, Trainer } from 'synaptic';

const net = new Architect.Perceptron(2, 4, 1); // input, hidden, output
const net2 = new Architect.LSTM(3, 5, 1);
```

- **Perceptron/`LSTM`/`Hopfield` per task (feedforward, sequences, associative).**
- **Layer sizes deliberate — depth vs width tuned for the data budget.**

---

## 2. Activation & Prediction
