---
name: hermes-best-practices
description: Best practices for running JavaScript on the Hermes engine — the Meta/React-Native JS engine conventions. Use when writing, structuring, or reviewing Hermes-targeted code — covers bytecode, GC, optimization limits, cold start, and RN integration.
---

# Hermes Best Practices

Hermes is **Meta's JS engine optimized for React Native/Android — precompiled bytecode, low-memory footprint, and fast startup** (no JIT; ahead-of-time bytecode and a compact GC). Practical Hermes-aware code leans on **writing for the interpreter's reality (no JIT warmup hand-waves), keeping the initial module graph small for cold start, careful memory ownership (Engine.release vs image absence), and testing under RN's Hermes flag** — Hermes rewards frugal allocation and small boot graphs, not polymorphic-fast-path tricks.

---

## 1. Bytecode & Startup

- **Precompile apps: Hermes's `.hbc` bytecode ships precompiled — faster start than JIT warmup:**

```bash
hermesc -emit-binary -out app.hbc app.js
```

- **Cold start = time-to-first-paint — trim the initial require graph** (lazy requires, defer heavy modules).
- **Owning the bytecode: RN `HermesMain`/rootless: `HermesInternal` flags are the runtime knobs — document the version's behavior.**

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

## 4. React Native Integration

- **Enable Hermes consistent (RN 0.70+): `enableHermes: true` in `metro.config`/AppDelegate:**
- **Test on Hermes (not V8/Chrome-sim) — the engine is the runtime:**
  - modern indices, `Intl`, BigInt, `FinalizationRegistry` — cross-engine deltas documented.
- **`global.HermesInternal.getRuntimeProperties()` for self-diagnosis where versions differ.**

---

## 5. Compatibility & Debugging

- **Feature-set differs from V8 (some built-ins shimmed) — polyfill the seams:**
- **Debug via the official Hermes CLI (`hermesc`/`hermes`) + Metro for bytecode checks; repro visually in RN.**
- **Debug via RN's Hermes DevTools protocol (Chrome DevTools → Hermes); console/perf tooling in RN.**

---

## General Rules of Thumb

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