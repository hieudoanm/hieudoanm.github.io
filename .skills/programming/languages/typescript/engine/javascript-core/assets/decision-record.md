# JavaScriptCore Best Practices: Decision Record

Use this record when applying [JavaScriptCore Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running JavaScript on JavaScriptCore — the WebKit/Apple JS engine conventions. Use when writing, structuring, or reviewing code that targets JSC — covers compiler tiers, FTL/baseline, JIT behavior, memory, and diagnosis.

JavaScriptCore (JSC) is **Apple's JS engine (WebKit, Safari, iOS/macOS JavaScript apps)** — with its own pipeline: parser → baseline JIT → DFG → FTL. Practical JSC-aware code shares V8-ish principles but with engine-specific levers: **stable shapes & monomorphic call sites still win; --useJIT/diagnostics via Safari's Performance tooling, not recipe-guessing** — steer code toward the fast paths JSC exposes, and read JSC's optimized IR only when profiling says so.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Shapes & Caching
- [ ] 2. JIT Tiers & Warmup
- [ ] 3. Typed Arrays & Big-Int
- [ ] 4. Memory & GC (JSC's generational GC)
- [ ] 5. Debugging & Diagnostics
- [ ] 6. Multi-Isolate & Workers
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
