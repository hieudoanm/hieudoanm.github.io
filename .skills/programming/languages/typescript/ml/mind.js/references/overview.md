# Overview

Focused reference for **mind-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Mind.js Best Practices

Mind.js is a **minimal neural network library for the browser/Node** — `new Mind()` with layers configured via `new Mind().learn(...)`/`predict(...)` and **JSON networks (`new Mind().upload(...)`)**. Practical Mind.js leans on **explicit `constructor`-time configuration (hidden layers, activation) via the `Mind` object, normalized input vectors, and the upload/save JSON path for persistence** — it's a small learning-tool API; the discipline is the data contract + verification, not framework lore.

---

## 1. Mind Instances

- **Create with configuration; predict on vectors:**

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

- **`learn` (train) + `predict` (infer) as the whole surface — inputs/outputs numeric arrays.**
- **Geodes: layers/activators configured at construction; mapping fixed across train/predict.**

---

## 2. Training Data
