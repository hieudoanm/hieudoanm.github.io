# Dodo Payments Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for Dodo Payments Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on rate limits and transient errors; idempotent calls
- **Queue webhook processing** — a failure shouldn't lose entitlement events
- Monitor:
- **webhook delivery failures / lag**
- **payment failures and declines**
- **subscription churn / failed renewals**
- **Region/availability awareness** — local methods vary by market; feature-flag accordingly

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
