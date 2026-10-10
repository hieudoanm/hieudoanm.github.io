# Braintree Best Practices: Decision Record

Use this record when applying [Braintree Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for payment integration with Braintree (PayPal's gateway). Use when accepting cards, PayPal, and alternative methods, or adding subscriptions — covers client tokens, server-side transactions, and webhooks.

Braintree is a payments gateway with a strong async-first API and owned by PayPal. Best practice is keeping the **card/sensitive data out of your server** (client token + Drop-in UI), running transaction requests server-side with idempotency, and consuming **webhooks** for state changes.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & Transactions
- [ ] 3. Subscriptions & Recurring
- [ ] 4. Webhooks & Verification
- [ ] 5. Security & Operations
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
