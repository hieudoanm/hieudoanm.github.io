# Resend Best Practices: Decision Record

Use this record when applying [Resend Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for sending transactional email with Resend. Use when integrating outbound email, handling bounces, or setting up templates — covers API usage, deliverability, webhooks, and reliability.

Resend is a developer-focused email API for transactional and marketing email. Best practice is treating email as a **deliverability engineering problem**: single recipient-focused API calls, webhooks for events (delivered/opened/bounced/complained), proper DNS/DKIM/SPF setup, and idempotent by-email retry handling.

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
