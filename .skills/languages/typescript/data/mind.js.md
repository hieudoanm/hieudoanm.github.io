---
name: mind-js-best-practices
description: Best practices for building neural networks in JS with Mind.js — the lightweight volatile NN conventions for browser/Node. Use when writing, structuring, or reviewing Mind.js — covers net construction, training, activation, serialization, and pitfalls.
---

# Mind.js Best Practices

Mind.js is a **minimal neural network library for the browser/Node** — `new Mind()` with layers configured via `new Mind().learn(...)`/`predict(...)` and **JSON networks (`new Mind().upload(...)`)**. Practical Mind.js leans on **explicit `constructor`-time configuration (hidden layers, activation) via the `Mind` object, normalized input vectors, and the upload/save JSON path for persistence** — it's a small learning-tool API; the discipline is the data contract + verification, not framework lore.

---

## 1. Mind Instances

- **Create with configuration; predict on vectors:**

```js
import Mind from "mind.js";

const mind = new Mind({ activator: "sigmoid" });
mind.learn([
  { input: [0, 0], output: [0] },
  { input: [1, 0], output: [1] },
] , { iterations: 1000, learningRate: 0.1 });
```

- **`learn` (train) + `predict` (infer) as the whole surface — inputs/outputs numeric arrays.**
- **Geodes: layers/activators configured at construction; mapping fixed across train/predict.**

---

## 2. Training Data

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

## 4. Serialization

- **Persistence via `save()`/`upload()` — the model JSON is the artifact:**

```js
const json = mind.save();
const revived = new Mind().upload(json);
```

- **`save`/`upload` round-trip instead of retraining at runtime.**
- **Version network shape with the data schema.**

---

## 5. Performance & Limits

- **Mind.js is a compact/lightweight learner — small parities, not deep nets.**
- **Batch predictions; avoid per-call reconfig; typed-array friendly when possible.**
- **For bigger models switch to Brain.js/TensorFlow.js — document the trigger.**

---

## 6. Testing & Pitfalls

- **Determinism: seed where the API allows; test the upload→predict round trip.**
- **Overfitting on tiny datasets — small iterations + validation judgment.**
- **Normalization + decoding as the tested contract (unit tests on the mapping).**

---

## General Rules of Thumb

- **Configure at construction; learn + predict the only verbs.**
- **Normalize in, decode out — the tested contract.**
- **Own the validation split; watch the error curve.**
- **`save`/`upload` as the deploy path.**
- **Small nets; version the schema.**

---

## Quick-Start Checklist

- [ ] `new Mind(...)` configured (activator/layers) once
- [ ] Inputs normalized; predict outputs decoded consistently
- [ ] `learn` with iteration/rate caps; error log watched
- [ ] Validation slice withheld; generalization judged
- [ ] `save`/`upload` persistence round-trips verified
- [ ] Normalization mapping unit-tested; schema versioned