# Implementation notes

Focused reference for **javascript-core-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 5. Debugging & Diagnostics

- **Safari Web Inspector / `jsc` CLI with `--profile` for CPU; allocation traces via Instruments.**
- **`js shell`: `d8`-analogue `jsc` — `--printstrings`, `--jitMemoryAllocation` diagnostics for the curious.**
- **Use engine-specific constants/flags for diagnosis, not for making code "fast by faith".**

---

## 6. Multi-Isolate & Workers

- **Workers + `SharedArrayBuffer` + `Atomics` for concurrency; transferables zero-copy:**

```js
const sab = new SharedArrayBuffer(1024);
const a = new Int32Array(sab);
Atomics.add(a, 0, 1);
```

- **Synchronize with `Atomics.wait/notify`; never busy-wait.**
- **Compute in typed-array workers; coordinator receives transfer-typed results.**
