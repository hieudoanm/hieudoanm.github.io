# Okta Best Practices: Decision Record

Use this record when applying [Okta Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Okta into a backend. Use when adding enterprise authentication, SSO/SAML-OIDC federation, or provisioning — covers token validation, group claims, SSO, and lifecycle management.

Okta is an enterprise identity platform known for SSO, federation, and lifecycle management. Best practice is leveraging it for **federated identity** (SAML/OIDC with enterprise IdPs), validating tokens locally, and relying on **groups as the authorization primitive** rather than custom role plumbing.

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
- [ ] 3. SSO, Federation & Provisioning
- [ ] 4. Security & Operations
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
