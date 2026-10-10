# RevenueCat Best Practices: 5. Reliability & Operations

## Scenario

A project is working on **5. reliability & operations** for RevenueCat Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Verify webhook auth** (Authorization: Bearer RC Webhook Secret) before processing
- **Idempotent webhook handling** — dedup by event id; retries expected
- **Reconcile periodically** via `GET /subscribers` to catch lag between webhooks and truth
- Monitor:
- **entitlement grant/revoke spikes**
- **webhook failures / delivery lag**
- **trial conversion and churn**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **5. Reliability & Operations** section of [SKILL.md](../SKILL.md).
