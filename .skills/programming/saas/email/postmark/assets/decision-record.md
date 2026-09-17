# Postmark Best Practices: Decision Record

Use this record when applying [Postmark Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for transactional email with Postmark. Use when sending app-triggered email reliably, handling bounces, or setting up delivery events — covers the send API, deliverability defaults, and reputation management.

Postmark is a transactional-email-only service (it rejects marketing/bulk by policy). Best practice is using it for **behavioral, app-triggered email** with high deliverability expectations: plain send API + templates, webhooks for bounces, and strict suppression handling.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & Sending
- [ ] 3. Deliverability & Events
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
