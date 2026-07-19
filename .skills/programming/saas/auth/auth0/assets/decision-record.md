# Auth0 Best Practices: Decision Record

Use this record when applying [Auth0 Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Auth0 into a backend. Use when adding authentication, configuring OIDC/OAuth2 clients, tenancy, or user management — covers token validation, MFA, rate limiting, and secure storage.

Auth0 is a hosted identity platform (OIDC/OAuth2) providing login, MFA, and user management. Best practice is treating it as a **trust boundary**: validate tokens locally (JWKS), never trust the browser, keep secrets server-side, and enable MFA and brute-force protection for production tenants.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & Token Handling
- [ ] 3. Security
- [ ] 4. Reliability & Operations
- [ ] 5. General Rules of Thumb
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
