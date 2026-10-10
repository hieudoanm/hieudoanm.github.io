# Square Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for Square Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on rate limits (429) and transient errors, using fresh idempotency keys
- Monitor:
- **webhook delivery failures**
- **payment failures / declines**
- **subscription cancellations and retry failures**
- Plan for **Square outages** — queue + retry over blocking the request path

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
