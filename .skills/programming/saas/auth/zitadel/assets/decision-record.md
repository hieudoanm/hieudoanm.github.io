# ZITADEL Best Practices: Decision Record

Use this record when applying [ZITADEL Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for running ZITADEL as a self-hosted or managed identity provider. Use when deploying realms/projects, configuring OIDC clients, or integrating IAM for your product — covers project/isolation model, token validation, and production operations.

ZITADEL is an identity and access management platform built on event sourcing (like Auth0/Keycloak but open source, Go-native). Best practice is using its **project/org model** for isolation, letting it own the authn user experience while your services enforce authz from verified claims, and validating tokens locally.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Isolation & Project Model
- [ ] 3. Integration & Token Handling
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
