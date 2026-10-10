# Implementation notes

Focused reference for **v8-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
