# Actix-web Best Practices: Decision Record

Use this record when applying [Actix-web Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust web services with Actix-web — the high-performance actor-based framework conventions. Use when writing, structuring, or reviewing Actix-web — covers App wiring, extractors, routes, state, error handling, middleware, and testing.

Actix-web is a high-performance, actor-based Rust web framework built on tokio. Practical Actix-web leans on **App composition with route/web::scope, web::Json/web::Path/web::Query extractors at the handler boundary, a single State (or Data) passed via App::app_data**, and **actix_web::Result/error mapping through From-conversions to HTTP responses**. Safety comes from Rust's type system; discipline keeps it ergonomic.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. App & Routing
- [ ] 2. Extractors & Handlers
- [ ] 3. State & Dependencies
- [ ] 4. Error Handling
- [ ] 5. Middleware
- [ ] 6. Data & Async
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
