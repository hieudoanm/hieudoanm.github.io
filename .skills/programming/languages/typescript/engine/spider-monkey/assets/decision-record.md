# SpiderMonkey Best Practices: Decision Record

Use this record when applying [SpiderMonkey Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running JavaScript on SpiderMonkey — the Firefox/Mozilla JavaScript engine conventions. Use when writing, structuring, or reviewing code that targets SM — covers JIT tiers, Ion/optimizations, stability, memory, and diagnostics.

SpiderMonkey (SM) is **Mozilla's JS engine (Firefox, and the FirefoxOS / embedded contexts)** — with a pipeline of interpreter → baseline JIT → Ion (tiered optimization) plus a bytecode-to-native compiler. Practical SM-aware code follows the same shape-discipline but with SM's specifics: **stable hidden classes (current "group"/shape), consistent call-site types for Ion, generated structures to avoid getter/setter surprise deopts, and profiles from --ion-monitoring/gecko profiler before tuning.**

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Hidden Classes & Shapes
- [ ] 2. JIT Tiers & Ion
- [ ] 3. Typed Structures & Works-with
- [ ] 4. Stability & Compatibility
- [ ] 5. Memory & GC
- [ ] 6. Diagnostics & Profiling
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
