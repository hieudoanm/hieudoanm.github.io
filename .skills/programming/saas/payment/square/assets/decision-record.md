# Square Best Practices: Decision Record

Use this record when applying [Square Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Square payments, including cards, subscriptions, and invoicing. Use when building checkout, commerce APIs, or processing online sales — covers API access tokens, webhooks, and secure payment handling.

Square provides commerce APIs (Payments, Subscriptions, Invoicing, Catalog). Best practice is using **access tokens scoped to a seller**, the **Payments API** with idempotency, hosted/fast checkout to avoid raw card handling, and **webhooks** as the source of payment truth.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & Checkout
- [ ] 3. Webhooks & State
- [ ] 4. Data & Security
- [ ] 5. Reliability & Operations
- [ ] 6. General Rules of Thumb
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
