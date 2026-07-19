# Auth.js Best Practices: Decision Record

Use this record when applying [Auth.js Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for authentication in JS apps with Auth.js (NextAuth) — the auth conventions for React/Next framework apps. Use when writing, structuring, or reviewing Auth.js — covers providers, session/JWT strategy, callbacks, database sessions, and security hygiene.

Auth.js (NextAuth) is the **authentication library for Next.js/React apps** — provider-agnostic (Credentials, OAuth/OIDC, Email), with **session strategy (jwt/database), callbacks, and adapters** as its knobs. Practical Auth.js leans on **a single, typed auth config with providers declared for the app's real flows, a deliberate session strategy (JWT for stateless/edge, DB for long-lived/roles), callbacks that attach identity minimally (never secrets), and route/edge protection at the layout** — the library handles the artifacts; you own the trust boundary.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup & Providers
- [ ] 2. Session Strategy
- [ ] 3. Callbacks
- [ ] 4. Protection & Routing
- [ ] 5. Database Sessions & Adapters
- [ ] 6. Security Hygiene
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
