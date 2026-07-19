---
name: v8-best-practices
description: Best practices for running JavaScript on the V8 engine — the Chrome/Node/Bun/V8-based JS engine conventions. Use when writing, structuring, or reviewing code that targets V8 — covers optimization tiers, hidden classes, typed-arrays, memory, and profiler-guided tuning.
---

# V8 Best Practices

V8 is **Google's JavaScript engine (Chrome, Node.js, Electron, Deno, Bun)** — code is JIT-compiled across tiers (Ignition interpreter → Sparkplug/TurboFan optimizing compiler). Practical V8-aware code leans on **stable object shape for fast hidden-class paths (`monomorphic`), typed arrays for numeric buffers, and profiler-guided optimization (`%OptimizeFunctionOnNextCall` is a debugging tool, not a production lever)** — most of the win is NOT contorting code; it's avoiding the known slow-path traps.

---

## 1. Object Shape & Monomorphism

- **Stable key insertion order/type per "shape" — hot paths stay monomorphic:**

```js
function render(item) {
  return { id: item.id, value: item.value };   // same 2-key shape every call
}
```

- **Avoid adding/removing properties after creation** (`obj.x = 1; delete obj.x` churns hidden classes).
- **Prefill object literals for a given constructor path; consistent types per slot (don't swap string/number).**
- **Reads of a stable shape compile fast; polymorphic ("shape soup") falls to slow paths.**

---

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

## 4. Memory & GC

- **V8 GC (generational — young/old) — allocations into old space survive scavenges:**
- **Large arrays/buffers and strings flow; avoid long pin/lifetime of buffers — null references after use.**
- **`--trace-gc` / `--print-opt-code` for diagnosis; residency viewed in `heap snapshots`.**
- **Symbols/keys internization minimal churn; `Object.freeze` can cost — freeze only where semantics require.**

---

## 5. Profiling & Tooling

- **Profile with `--prof`/`--cpu-prof` / DevTools CPU profile; the flame is the map:**
- **Optimization tier affinity: `d8 --trace-opt --trace-deopt` (debug harness only).**
- **Compare tiers — most code is fast enough unoptimized; optimize what the profile says, None else.**

---

## 6. Multi-Threading (Workers)

- **`Worker`/`SharedArrayBuffer` for parallel compute; `Atomics` for synchronization:**

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