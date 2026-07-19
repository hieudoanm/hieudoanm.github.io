# Osso Best Practices: Decision Record

Use this record when applying [Osso Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for self-hosting SSO for B2B SaaS with Osso. Use when adding enterprise SAML login, managing IdP connections, or syncing directory users — covers SAML flows, connection management, and production deployment.

Osso is an open-source, self-hosted SAML SSO service for B2B SaaS products — the "Auth0 for enterprise on your own infra." Best practice is treating it as an internal identity gateway: SAML termination handled by a single service, IdP connections managed as data, and directory users synced via SCIM for upstream apps like Okta/Azure AD.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration Patterns
- [ ] 3. Deployment & Operations
- [ ] 4. Security
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
