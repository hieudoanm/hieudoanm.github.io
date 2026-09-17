# http4s Best Practices: Decision Record

Use this record when applying [http4s Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building Scala HTTP services with http4s — the functional, cats-effect-based framework conventions. Use when writing, structuring, or reviewing http4s — covers server/client, routes, Kleisli/DSL, mtl-structured effects, error handling, and testing.

http4s is a **purely functional HTTP library on cats-effect** — routes are HttpRoutes/Kleisli[F, Request[F], Response[F]], and every handler returns an F[_]. Practical http4s leans on **the routes DSL (pattern-matching methods), services composed with orNotFound + middlewares, F threaded everywhere with the effect type in the signature**, and **EntityCodec/EntityDecoder for typed JSON**. The type system IS the HTTP contract; errors are values in the F.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Scala and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Server & App Wiring
- [ ] 2. Routes & DSL
- [ ] 3. Effects & Context
- [ ] 4. Middleware & Errors
- [ ] 5. Client
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
