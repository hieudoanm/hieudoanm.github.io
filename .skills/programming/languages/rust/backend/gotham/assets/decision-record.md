# Gotham Best Practices: Decision Record

Use this record when applying [Gotham Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust web services with Gotham — the type-safe, principled framework conventions. Use when writing, structuring, or reviewing Gotham — covers router composition, state/handler design, extractors, error handling, concurrency, and testing.

Gotham is a **type-safe, principled Rust web framework** — it threads State (an extensible request context) explicitly through handlers (receive_and_respond style) and is built on hyper. Practical Gotham leans on **router::builder::tree for typed routes, handler functions receiving State and returning responses, and explicit error types** converted at the boundary. Gotham's philosophy: fewer surprises, more compile-time structure — a good match for services where correctness is the top priority.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Router & Bootstrapping
- [ ] 2. Handlers & State
- [ ] 3. Extractors
- [ ] 4. Error Handling
- [ ] 5. Async & Dependencies
- [ ] 6. Testing
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
