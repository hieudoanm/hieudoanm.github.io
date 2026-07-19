# Lemon Squeezy Best Practices: 3. Webhooks & Entitlement

## Scenario

A project is working on **3. webhooks & entitlement** for Lemon Squeezy Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Verify webhook signatures** (HMAC `X-Signature` against raw body + webhook secret) before trusting payloads
- **Dedup by event id** (`data.id` / event identifier) — delivery can repeat
- Handle the **canonical events**:
- `order_created`, `subscription_created`, `subscription_cancelled`, `subscription_resumed`, `subscription_expired`, `subscription_paused`
- **Grant access on paid/active state** (order paid, subscription active), **revoke on cancellation/expiry**
- For **license keys**: embed user/plan in the key payload and validate server-side where online

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **3. Webhooks & Entitlement** section of [SKILL.md](../SKILL.md).
