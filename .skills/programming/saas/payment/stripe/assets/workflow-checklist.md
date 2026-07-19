# Stripe Best Practices: Workflow Checklist

A practical run sheet for applying [Stripe Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Principles: **API keys**: pk_ (publishable, client) vs sk_ (secret, server-only) — never ship sk_
- [ ] 1. Core Stack & Principles: **PaymentIntents** for one-off / dynamic amounts; **Subscriptions** for recurring
- [ ] 2. Integration & Checkout: Use **Checkout Sessions** or the Payment Element instead of building raw card forms
- [ ] 2. Integration & Checkout: **Never compute or modify amounts client-side** — amounts/totals belong server-side
- [ ] 3. Webhooks & State: **Verify webhook signatures** with your whsec_ signing secret (HMAC-SHA256) and the Stripe-Signature header — never trust unverified payloads
- [ ] 3. Webhooks & State: **Handle event idempotency**: store processed event IDs (crash-safe dedup)
- [ ] 4. Data & Endpoints: Use **metadata** on intents/customers to fan out your own reconciliation
- [ ] 4. Data & Endpoints: **Live vs test mode** kept strict (different keys, different secret); never point prod at test
- [ ] 5. Reliability & Monitoring: **Retry with backoff** on 429 / connection errors; honor rate limits
- [ ] 5. Reliability & Monitoring: **Downstream idempotence**: after payment_intent.succeeded, granting access must be idempotent (dedup by event/payment ID)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
