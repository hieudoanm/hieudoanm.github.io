# Hyper Best Practices: Decision Record

Use this record when applying [Hyper Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Rust HTTP applications with hyper — the low-level HTTP library conventions. Use when writing, structuring, or reviewing hyper-based services — covers Server/Client, service traits, body handling, routing, error handling, and testing.

hyper is the underlying HTTP library for much of the Rust ecosystem — it gives you the **HTTP protocol (HTTP/2, client + server) while you own the composition**. Practical hyper leans on **hyper::Server with a Service implementing call(req)**, **typed requests/bodies (hyper::Request/Response<Body>)**, and **explicit routing/error mapping because hyper provides none of it**. It's the right choice when you need control or correctness-critical boundaries; for most products the framework layer (axum, actix-web) composes it for you.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Rust and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Server Basics
- [ ] 2. The Service Trait
- [ ] 3. Requests, Bodies & Extractors
- [ ] 4. Routing (Hand-Rolled)
- [ ] 5. Errors & Middleware
- [ ] 6. Client
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
