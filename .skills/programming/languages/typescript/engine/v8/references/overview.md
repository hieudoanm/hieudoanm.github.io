# Overview

Focused reference for **v8-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
