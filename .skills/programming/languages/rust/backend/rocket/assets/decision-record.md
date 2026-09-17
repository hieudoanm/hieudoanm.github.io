# Rocket Best Practices: Decision Record

Use this record when applying [Rocket Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust web services with Rocket — the macro-driven, developer-friendly framework conventions. Use when writing, structuring, or reviewing Rocket — covers launching, routes, request guards, state, URI, error handling, and testing.

Rocket is a **macro-driven Rust web framework** where routes are #[get]/#[post]-attributed functions and **argument types are extractors (Request Guards, Query, Path)** defined by FromRequest. Practical Rocket leans on **typed route signatures, State for shared context, serde outcomes on Json<T>**, and **#[catch] handlers for uniform error responses**. Rocket prizes type-safety and developer ergonomics — your compile errors ARE the API contract.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Launch Structure
- [ ] 2. Routes & Functions
- [ ] 3. Request Guards & State
- [ ] 4. JSON & Serialization
- [ ] 5. Errors & Logging
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
