# Warp Best Practices: Decision Record

Use this record when applying [Warp Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust web services with warp — the composable filter-based framework conventions. Use when writing, structuring, or reviewing warp — covers filter composition, routing, extractors, state, error handling, and testing.

Warp builds servers from **composable Filters** — every route/fact (path, method, query, body, header, state) is a Filter combined with and/or/map/and_then. Practical warp leans on **small named filters (path("users").and(path::param::<u64>().or(...))), filters declared once and reused, warp::Filter-based extractors returning typed tuples**, and **Rejection-based error handling with warp::reject/recover**. The filter pipeline is the API — compose it readably and test filters without a server.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Filter Composition
- [ ] 2. Routes & Handlers
- [ ] 3. State & Dependencies
- [ ] 4. Errors & Rejections
- [ ] 5. Middleware & Logging
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
