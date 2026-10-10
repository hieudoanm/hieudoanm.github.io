# Implementation notes

Focused reference for **brain-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
