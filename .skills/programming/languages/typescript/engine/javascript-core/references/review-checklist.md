# Review checklist

Focused reference for **javascript-core-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
