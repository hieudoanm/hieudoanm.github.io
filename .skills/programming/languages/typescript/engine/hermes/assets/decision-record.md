# Hermes Best Practices: Decision Record

Use this record when applying [Hermes Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running JavaScript on the Hermes engine — the Meta/React-Native JS engine conventions. Use when writing, structuring, or reviewing Hermes-targeted code — covers bytecode, GC, optimization limits, cold start, and RN integration.

Hermes is **Meta's JS engine optimized for React Native/Android — precompiled bytecode, low-memory footprint, and fast startup** (no JIT; ahead-of-time bytecode and a compact GC). Practical Hermes-aware code leans on **writing for the interpreter's reality (no JIT warmup hand-waves), keeping the initial module graph small for cold start, careful memory ownership (Engine.release vs image absence), and testing under RN's Hermes flag** — Hermes rewards frugal allocation and small boot graphs, not polymorphic-fast-path tricks.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Bytecode & Startup
- [ ] 2. No-JIT Discipline
- [ ] 3. Memory & GC
- [ ] 4. React Native Integration
- [ ] 5. Compatibility & Debugging
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
