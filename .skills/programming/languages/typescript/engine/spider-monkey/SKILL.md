---
name: spider-monkey-best-practices
description: Best practices for running JavaScript on SpiderMonkey — the Firefox/Mozilla JavaScript engine conventions. Use when writing, structuring, or reviewing code that targets SM — covers JIT tiers, Ion/optimizations, stability, memory, and diagnostics.
---

# SpiderMonkey Best Practices

SpiderMonkey (SM) is **Mozilla's JS engine (Firefox, and the FirefoxOS / embedded contexts)** — with a pipeline of interpreter → baseline JIT → Ion (tiered optimization) plus a bytecode-to-native compiler. Practical SM-aware code follows the same shape-discipline but with SM's specifics: **stable hidden classes (current "group"/shape), consistent call-site types for Ion, generated structures to avoid `getter`/`setter` surprise deopts, and profiles from `--ion-monitoring`/gecko profiler before tuning.**

---

## 1. Hidden Classes & Shapes

- **Stable shape transitions per allocation site (SM uses "shapes" like V8/Dart-like):**

```js
function Point(x, y) { this.x = x; this.y = y; }
```

- **Prefill full shape at construction; late-property addition re-shapes.**
- **Same-type slots stay monomorphic — mixed shapes force megamorphic dispatch.**

---

## 2. JIT Tiers & Ion

- **SM tiers: interpreter → Baseline → Ion (optimizing) — stable frequent loops warm up to Ion:**
- **Ion bails on type drift; keep accumulators one type (int stays int).**
- **Expected: hot functions hit Ion; check `--ion-monitoring` only when the profiler says the function is hot.**

---

## 3. Typed Structures & Works-with

- **Typed typed-arrays first-class (including `BigInt64Array`)— numeric tunnels native:**
- **Prefer `DataView`/typed views over bit-twiddling boxed objects for buffer IO.**
- **`ArrayBuffer` transferable across workers; structured cloning deliberate.**

---

## 4. Stability & Compatibility

- **SM engines vary by embedder — test against the actual embedded version (Firefox vs server/feedJS forks).**
- **WorkerLifecycle/`exit` semantics differ — pin the embedder contract before streaming.**
- **Respect `mozilla-specific` APIs (`tc39-*` subsets) when cross-engine; feature-check over sniffing.**

---

## 5. Memory & GC

- **SM's mark-compact GC: generational young + major collections — allocation-rate aware:** 
- **Temporary buffers in the youngest heap; clear references after big array use.**
- **`performance.measureUserAgentSpecificMemory` (Mozilla) for dashboards in Fx.**

---

## 6. Diagnostics & Profiling

- **Gecko profiler / `--ion-monitoring --ion-bailout-recover` for JIT behavior:**
- **`jsshell` (`js` binary) with `--ion-verbose`-style output for engine-level diagnosis (debug only).**
- **Tune after a profile claims — not before.**

---

## General Rules of Thumb

- **Stable shapes for monomorphic fast paths; prefill construction.**
- **Stable types (one per slot) for Ion; bench-run warm.**
- **Typed arrays for tunnels; deopt avoid in hot loops.**
- **Test against the exact embedded SM version; feature-check cross-engine.**
- **Profile (Gecko/ion-monitoring) before optimization; no cargo-cult flags.**

---

## Quick-Start Checklist

- [ ] Constructor-shape prefill; monomorphic call-sites
- [ ] Hot loops Ion-safe (no type drift; try/eval out)
- [ ] Typed arrays/BigInt64 where numeric; transfers zero-copy
- [ ] Embedded SM version pinned; feature checks for cross-engine
- [ ] Memory: young-heap-aware allocs; references cleared
- [ ] Gecko profiler / ion diagnostics guide changes; suites warm-run