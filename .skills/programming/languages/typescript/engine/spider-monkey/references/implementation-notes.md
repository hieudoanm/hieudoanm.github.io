# Implementation notes

Focused reference for **spider-monkey-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
