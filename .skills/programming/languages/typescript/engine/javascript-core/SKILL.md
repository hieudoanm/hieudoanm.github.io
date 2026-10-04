---
name: javascript-core-best-practices
description: Best practices for running JavaScript on JavaScriptCore — the WebKit/Apple JS engine conventions. Use when writing, structuring, or reviewing code that targets JSC — covers compiler tiers, FTL/baseline, JIT behavior, memory, and diagnosis.
---

# JavaScriptCore Best Practices

JavaScriptCore (JSC) is **Apple's JS engine (WebKit, Safari, iOS/macOS JavaScript apps)** — with its own pipeline: parser → baseline JIT → DFG → FTL. Practical JSC-aware code shares V8-ish principles but with engine-specific levers: **stable shapes & monomorphic call sites still win; `--useJIT`/diagnostics via Safari's Performance tooling, not recipe-guessing** — steer code toward the fast paths JSC exposes, and read JSC's optimized IR only when profiling says so.

---

## 1. Shapes & Caching

- **Stable property layout per constructor — JSC caches on shapes; same discipline as V8:**

```js
function Vec(x, y) { this.x = x; this.y = y; }   // same shape every new Vec
```

- **Precreate objects fully; adding keys later in hot code forces re-transition.**
- **Same-type slots (`number` stays number); polymorphic-dispatch sites slow — normalize at the call seam.**

---

## 2. JIT Tiers & Warmup

- **JSC runs: baseline (interpreter), DFG (medium), FTL (optimizing) — tier-up paths come from call/structure frequency:**
- **Hot loops stabilized over warmup — benchmarks must warm up before timing (JSC benchmarks document this ceremony).**
- **Bailouts deopt from FTL — keep inner code `try`-free, type-stable; inspect `--log`/`ValidationField` debug harnesses (not prod).**

---

## 3. Typed Arrays & Big-Int

- **Typed arrays (including `BigInt64Array`) map to native memory — good for numeric tunnels:**
- **Int64-ish work via BigInt for exactness; avoid `>>` on large bitmasks unless Smi-range.**
- **`ArrayBuffer` transferable across workers; `structuredClone` for structured payloads.**

---

## 4. Memory & GC (JSC's generational GC)

- **JSC GC = semi-space + mark-sweep; allocation counts drive `--gc-observation`:**
- **Short-lived objects stay in youngest heap; watch retention in `heap` snapshots (Safari/Mac instrumentation).**
- **`FinalizationRegistry` for deterministic teardown where lifecycles matter.**

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

---

## General Rules of Thumb

- **Stable shapes/slots; monomorphic seams.**
- **Warm up benchmarks; stabilize hot loops across tiers.**
- **Typed arrays for numeric buffers; BigInt for exact-64.**
- **Profile with Safari/JSC tooling before tuning; no cargo-cult flags.**
- **Workers + SharedArrayBuffer + Atomics; transfer zero-copy.**

---

## Quick-Start Checklist

- [ ] Stable constructor shapes; normalized polymorphic dispatch
- [ ] Benchmark warm-up; tier-stable hot loops (no deopt)
- [ ] Typed arrays/BigInt for exact numeric work
- [ ] GC awareness; heap snapshots via Safari/Instruments
- [ ] `jsc`/Safari profiling for actual hotspots only
- [ ] Workers + Atomics discipline; transfers not copies