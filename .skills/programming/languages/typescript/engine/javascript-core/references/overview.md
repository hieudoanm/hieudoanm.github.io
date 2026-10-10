# Overview

Focused reference for **javascript-core-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
