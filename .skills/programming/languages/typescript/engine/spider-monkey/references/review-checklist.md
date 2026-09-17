# Review checklist

Focused reference for **spider-monkey-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
