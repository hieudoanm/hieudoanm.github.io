# Overview

Focused reference for **hermes-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
