# Implementation notes

Focused reference for **synaptic-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
