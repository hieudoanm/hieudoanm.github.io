# Square Best Practices: Quick-Start Checklist

## Scenario

A project is working on **quick-start checklist** for Square Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- [ ] Per-seller access tokens; client id/secret server-side
- [ ] Web Payments SDK / Payment Links — no raw PAN handling
- [ ] Idempotency key on every CreatePayment; amounts server-side
- [ ] `Square-Version` header pinned
- [ ] Webhooks signature-verified; events deduped by event_id
- [ ] Entitlement granted on COMPLETED (idempotent); refunds/cancellations handled
- [ ] Per-location selection deliberate; tokens rotated

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md).
