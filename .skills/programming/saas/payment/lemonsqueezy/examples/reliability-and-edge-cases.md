# Lemon Squeezy Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for Lemon Squeezy Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry/queue webhook processing** — LS retries failures; your consumer must be idempotent
- **Sandbox vs production** keys separated; webhook secret server-side only
- Monitor:
- **webhook delivery failures/lag**
- **subscription churn and payment failures**
- **refund / dispute rates**
- Mind **LS → Stripe migration** if you onboard onto Stripe-backed subscription features

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
