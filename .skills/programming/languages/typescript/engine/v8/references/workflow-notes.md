# Workflow notes

Focused reference for **v8-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Typed Arrays & Numeric Work

- **`Float64Array`/`Int32Array` for numeric buffers — flat, unboxed, SIMD-able:**

```js
const buf = new Float64Array(1024);
for (let i = 0; i < buf.length; i++) buf[i] = i * 0.5;
```

- **Heavy loops in typed-array land (not boxed Number objects); preallocate sizes.**
- **`ArrayBuffer` transfer via `structuredClone`/transferable for worker messages (zero-copy).**
- **Bitwise/Perf: integer-only math on integer-only code stays in Smi range; mixed types force deopt boxes.**

---

## 3. Deoptimization Traps

- **Distinct sources deopt the hot function** — mixing int/float/double in one accumulator, bailouts from `in`-guards.
- **`try/catch`/`with`/`eval` restrict optimization in their scope** — keep them out of the hot inner loop.
- **Varying arg counts/types in a hot call hurt inline caches — keep call-site types stable.**

---
