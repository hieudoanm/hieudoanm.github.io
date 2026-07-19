# Polar Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for Polar Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry/backoff webhook consumer**; idempotent handlers (dedup by event id)
- Persist **order/subscription ids** in your DB as ground truth for support/refund handling
- **Sandbox vs production** separated; webhook secret server-side only
- Monitor:
- **webhook failures / lag**
- **subscription churn and failed renewals**
- **benefit grant failures** (license generation, repo invite)

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
