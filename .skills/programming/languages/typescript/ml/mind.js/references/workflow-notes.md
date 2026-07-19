# Workflow notes

Focused reference for **mind-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Inputs normalized (scale to the activation's sweet spot), outputs in the same scale:**

```js
mind.learn(data, { iterations: 200, learningRate: 0.1, log: true });
```

- **Withhold a validation slice — Mind.js gives no built-in split; you own it.**
- **Watch console `log` errors; increase iterations only while error actually falls.**

---

## 3. Prediction & Interpretation

- **`predict` outputs in normalized space — decode to the real scale:**

```js
const raw = mind.predict([0.9, 0.1]);
const isCat = raw[0] > 0.5;
```

- **Thresholds defined per output node; mult-class via argmax over outputs.**
- **Document the transform both ways: it's lossy if you forget.**

---
