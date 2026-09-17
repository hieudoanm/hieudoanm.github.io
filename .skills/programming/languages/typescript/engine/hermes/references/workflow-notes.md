# Workflow notes

Focused reference for **hermes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. No-JIT Discipline

- **Hermes is an interpreter (no Ion-style tier) — code style = normal, but:**
- **Ion-flavored hacks (shapes as performance) matter less; correctness/GC matters more.**
- **The cost model: fewer allocations, smaller graphs, bounded closures.**

---

## 3. Memory & GC

- **Hermes GC is generational with compacting major cycles — allocation-rate aware:**
- **Queue releases: `Engine.release()` after background graphs; keep references short on large arrays.**
- **`console.log`/neseted closures that retain — watch `RetainedRoots` in snapshots.**
- **`--trace-gc` clone school for RN; use `React Native` memory profiler for residency.**

---
