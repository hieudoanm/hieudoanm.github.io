# Workflow notes

Focused reference for **paddle**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Checkout & Subscription Modeling

- **Create products/prices in the Catalog**; subscribe users via Checkout/overlay
- **Pass `passthrough` meta** (user/order id) for reconciliation
- **Map Paddle subscription lifecycle → your entitlements**: active/paused/past_due/canceled
- Use **custom prices / pay-what-you-want** only where product strategy demands it
- **Never trust client-side totals** — tax/invoice generation belongs to Paddle; amounts are server-side

---

## 3. Webhooks & Fulfillment

- **Verify webhook signatures** (HMAC on raw body) before trusting the payload
- **Dedup events by `id`/`subscription_id + event_type`**
- Grant access **only on confirmed/paid states** (`transaction.completed`, subscription active)
- On **payment failure / subscription paused**: downgrade or surface billing issues, don't silently revoke instantly where product policy allows grace
- Handle **refunds and chargebacks** — revoke entitlement when paid-backed
