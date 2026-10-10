# Pyramid Best Practices: Decision Record

Use this record when applying [Pyramid Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building web apps with Pyramid — the lightweight, flexible Python web framework conventions. Use when writing, structuring, or reviewing Pyramid — covers config, routes/views, traversal, authentication, and deployment.

Pyramid is **a minimalist-but-expansive Python web framework** — small core with batteries through add-ons; routes + views with declarative config. Practical Pyramid leans on **declarative configuration (config.add_route/decorators or include-mechanism), views as plain callables with typed decorators, request-driven context, and authentication via its security model (authentication_policy + authorization_policy)** — start small, add complexity you can justify.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Configuration & Setup
- [ ] 2. Views & Routing
- [ ] 3. Traversal vs URL Dispatch
- [ ] 4. Authentication & Authorization
- [ ] 5. Middleware & Add-ons
- [ ] 6. Deployment & Testing
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
