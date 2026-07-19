# Review checklist

Focused reference for **hermes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Bytecode-by-default; small initial require graph for cold start.**
- **Interpreter cost model: frugality over JIT tricks.**
- **GC-aware memory: release early, minimize old-space retention.**
- **Test under the real engine (Hermes), not Chrome/V8 sim.**
- **Version-pin `hermes-engine`; feature-check the shims.**

---

## Quick-Start Checklist

- [ ] Precompiled bytecode in builds; lazy-required hot paths
- [ ] No-JIT cost model discipline (allocations, closures, graphs)
- [ ] GC: releases scheduled; snapshots reviewed for retention
- [ ] `enableHermes` consistent across app builds; tested on-engine
- [ ] Engine deltas (Intl/BigInt/shim) documented; polyfilled seams
- [ ] `hermes-engine` version pinned; runtime self-diagnosis available
