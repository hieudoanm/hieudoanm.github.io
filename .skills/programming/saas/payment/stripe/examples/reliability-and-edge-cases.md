# Stripe Best Practices: 5. Reliability & Monitoring

## Scenario

A project is working on **5. reliability & monitoring** for Stripe Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Retry with backoff** on 429 / connection errors; honor rate limits
- **Downstream idempotence**: after `payment_intent.succeeded`, granting access must be idempotent (dedup by event/payment ID)
- Monitor:
- **webhook failures / delivery lag**
- **failed payments & disputes**
- **balance/account negatives**
- Plan for **Stripe outages** — queues and retries over synchronous blocking

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Monitoring** section of [SKILL.md](../SKILL.md).
