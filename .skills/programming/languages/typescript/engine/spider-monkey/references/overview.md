# Overview

Focused reference for **spider-monkey-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
