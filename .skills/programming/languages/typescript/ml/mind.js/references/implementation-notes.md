# Implementation notes

Focused reference for **mind-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
