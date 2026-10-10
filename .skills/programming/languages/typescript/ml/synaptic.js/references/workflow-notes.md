# Workflow notes

Focused reference for **synaptic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
trainer.train(
  [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
  ],
  { iterations: 5000, error: 0.01, log: 50, rate: 0.1 }
);
```

- **Small `rate` + iteration cap for stability; watch `error` convergence (not raw iterations).**
- **Training data separate from validation — check generalization on a withheld set.**

---
