# Polar Best Practices: 2. Checkout & Product Model

## Scenario

A project is working on **2. checkout & product model** for Polar Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Define **products + tiers** (Free/Pro/Team as subscriptions or one-time) with per-tier **benefits**
- Pass **`custom metadata`** (user id, org) on orders/subs for reconciliation
- **Amounts from your catalog only** — never compute totals client-side
- Offer **presale/preorder or donante/PRO tiers** deliberately; keep the free tier a real product
- Tooling: **Polar SDKs (JS/TS/Python)** for API + webhook integration

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Checkout & Product Model** section of [SKILL.md](../SKILL.md).
