# Stripe Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Stripe Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] `sk_` keys server-side only; publishable key minimal-scoped
- [ ] Checkout Session / Payment Element used; amounts computed server-side
- [ ] Idempotency keys on all mutating calls
- [ ] Webhook signatures verified; event IDs deduped
- [ ] Canonical events handled (intents, invoices, subscriptions, disputes, refunds)
- [ ] Payment state persisted from webhooks (not client callbacks)
- [ ] Failed payments + disputes monitored; retries with backoff

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
