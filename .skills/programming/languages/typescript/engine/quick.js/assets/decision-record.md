# QuickJS Best Practices: Decision Record

Use this record when applying [QuickJS Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for embedding JavaScript with QuickJS — the small, embeddable JS engine conventions. Use when writing, structuring, or reviewing QuickJS deployments — covers embedding, context, isolation, memory limits, and integration with FFI/Rust bindings.

QuickJS is **a small, embeddable JS engine (nice perf, Tiny footprint) — used by Bun, deno, and as the embedded interpreter in many products** via the C library and Rust bindings. Practical QuickJS embeds in lean on **one JSContext per isolate with explicit lifetimes (JS_NewRuntime/JS_NewContext), memory limits and interrupts configured (JS_SetMemoryLimit, JS_SetMaxStackSize), and a tight object-lifecycle discipline (JS_FreeValue)** — the engine gives you the foot-gun ammo; containment is the discipline.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Embedding Model
- [ ] 2. Limits & Interrupts
- [ ] 3. Values & Objects
- [ ] 4. Property & C Interop
- [ ] 5. Async & Workers
- [ ] 6. Rust & Bindings
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
