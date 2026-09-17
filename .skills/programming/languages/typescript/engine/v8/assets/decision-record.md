# V8 Best Practices: Decision Record

Use this record when applying [V8 Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running JavaScript on the V8 engine — the Chrome/Node/Bun/V8-based JS engine conventions. Use when writing, structuring, or reviewing code that targets V8 — covers optimization tiers, hidden classes, typed-arrays, memory, and profiler-guided tuning.

V8 is **Google's JavaScript engine (Chrome, Node.js, Electron, Deno, Bun)** — code is JIT-compiled across tiers (Ignition interpreter → Sparkplug/TurboFan optimizing compiler). Practical V8-aware code leans on **stable object shape for fast hidden-class paths (monomorphic), typed arrays for numeric buffers, and profiler-guided optimization (%OptimizeFunctionOnNextCall is a debugging tool, not a production lever)** — most of the win is NOT contorting code; it's avoiding the known slow-path traps.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Object Shape & Monomorphism
- [ ] 2. Typed Arrays & Numeric Work
- [ ] 3. Deoptimization Traps
- [ ] 4. Memory & GC
- [ ] 5. Profiling & Tooling
- [ ] 6. Multi-Threading (Workers)
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
