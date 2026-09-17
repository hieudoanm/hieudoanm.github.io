# Review checklist

Focused reference for **v8-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```js
const sab = new SharedArrayBuffer(1024);
const a = new Int32Array(sab);
Atomics.add(a, 0, 1);
```

- **Transferables over postMessage copies for buffers — task units sized to shared allocs.**
- **Lock discipline: `Atomics.wait/notify` patterns, never busy-poll.**

---

## General Rules of Thumb

- **Stable object shapes; keep hot paths monomorphic.**
- **Typed arrays for numeric work; integer math in Smi range.**
- **`try/catch/eval` out of inner loops; stable call-site types.**
- **GC/alloc awareness: minimize old-space retention; inspect profiles.**
- **Worker transferables + `Atomics` for parallelism.**

---

## Quick-Start Checklist

- [ ] Object construction stable (fixed shape per hot path); no shape churn
- [ ] Typed arrays for buffers; preallocated sizes
- [ ] Hot loops deopt-free (no mixed-type accumulators; eval/try out)
- [ ] `--prof`/CPU profiles guide any optimization; no cargo-cult flags
- [ ] Workers + `SharedArrayBuffer` + `Atomics`; transfer zero-copy
- [ ] Heap snapshots reviewed for old-space retention
