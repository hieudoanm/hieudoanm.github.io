# Workflow notes

Focused reference for **brain-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Inputs/outputs as arrays of numbers (normalized, not raw booleans only):**

```js
net.train(
  [
    { input: [0, 0], output: [0] },
    { input: [1, 0], output: [1] },
  ],
  { iterations: 5000, errorThresh: 0.01, log: false }
);
```

- **Normalization to `[0,1]`/`[-1,1]` — decode identically at predict.**
- **Class imbalance: more samples for rarer classes; validation split withheld.**

---

## 3. Training Options & Monitoring

- **Options deliberate: `iterations`, `errorThresh`, `learningRate`, `log`:**

```js
net.train(data, {
  iterations: 20000,
  errorThresh: 0.005,
  learningRate: 0.2,
  log: (e) => track(e.error),
});
```

- **Watch `error` curve — stop when it flattens (use errorThresh + iteration cap).**
- **Small learning rates with more iterations beat spikes; seeded reproducibility documented.**

---
