# SendGrid Best Practices: Decision Record

Use this record when applying [SendGrid Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for sending email with Twilio SendGrid. Use when integrating transactional/marketing email, configuring sender authentication, or handling delivery events — covers API usage, deliverability, and event webhooks.

SendGrid is the Twilio email platform for transactional and marketing email. Best practice is treating it as a **deliverability pipeline**: authenticated sender domains (DKIM/SPF/DMARC), a single sending strategy per type, and event webhooks over polling to react to bounces/complaints.

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
