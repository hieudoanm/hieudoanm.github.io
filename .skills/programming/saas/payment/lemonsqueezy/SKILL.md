---
name: lemonsqueezy
description: Best practices for selling digital products and subscriptions with Lemon Squeezy (now part of Stripe's merchant of record). Use when integrating checkout, managing licenses/entitlements, or consuming webhooks — covers MoR model, webhook signatures, and subscription lifecycle.
---

# Lemon Squeezy Best Practices

Lemon Squeezy is a **merchant of record (MoR)** for digital products — it owns tax, invoicing, and compliance. Best practice is leaning on that: LS-driven checkout, **webhooks as the entitlement source of truth**, and your server both issuing licenses/entitlements and verifying them.

---

## 1. Core Stack & Concepts

- **Products + Variants** define what you sell; **subscriptions** (with trial params) for recurring
- **Checkout** is hosted/overlay; pass **custom data** (`custom`) for correlation
- **Webhooks** for orders, subscriptions, and license keys
- **License key** support for desktop/offline caveat: keys do not verify subscription state itself
- New **Stripe-owned subscription model**: checkout sessions + Stripe webhooks (note rollout differences)

```
User ──► LS Checkout ──► LS (MoR: tax, invoicing) ──► Webhook ──► Your backend
                                                          └─► grant entitlement / license
```

---

## 2. Checkout & Correlation

- Create **products/variants** in the dashboard/API; embed checkout link or overlay
- Pass **`custom` fields** (user_id, order context) so webhooks map back to accounts
- **Amounts always server-side/from the catalog** — never client-supplied totals
- Prefer **`checkout` session creation** over hand-built URLs where client token flow is desired

---

## 3. Webhooks & Entitlement

- **Verify webhook signatures** (HMAC `X-Signature` against raw body + webhook secret) before trusting payloads
- **Dedup by event id** (`data.id` / event identifier) — delivery can repeat
- Handle the **canonical events**:
  - `order_created`, `subscription_created`, `subscription_cancelled`, `subscription_resumed`, `subscription_expired`, `subscription_paused`
- **Grant access on paid/active state** (order paid, subscription active), **revoke on cancellation/expiry**
- For **license keys**: embed user/plan in the key payload and validate server-side where online

```ts
const sig = req.headers["x-signature"];
const digest = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (sig !== digest) return res.status(401).end();
// event.data → dedup → entitlement updates
```

---

## 4. MoR & Compliance

- **You do not charge tax** — LS is the seller of record; don't hand-roll VAT/sales tax
- Keep **transaction/order + subscription ids** in your DB for refunds/disputes
- On **refund/dispute**: revoke entitlement consistent with your product policy
- Prefer **annual/unlimited** where rejection risk is low (MoR reduces, not removes, chargeback risk)

---

## 5. Reliability & Operations

- **Retry/queue webhook processing** — LS retries failures; your consumer must be idempotent
- **Sandbox vs production** keys separated; webhook secret server-side only
- Monitor:
  - **webhook delivery failures/lag**
  - **subscription churn and payment failures**
  - **refund / dispute rates**
- Mind **LS → Stripe migration** if you onboard onto Stripe-backed subscription features

---

## 6. General Rules of Thumb

- **LS is the MoR** — tax and invoicing are their problem, entitlements are yours
- **Webhooks drive state** — verify, dedup, react to paid/active events
- **Correlate with custom data** — webhooks must map back to your users
- **Server-side truth, off-path sending** — never trust client callbacks

---

## Quick-Start Checklist

- [ ] Products/variants defined; checkout + `custom` correlation in place
- [ ] Webhook signatures verified (HMAC on raw body); events deduped
- [ ] Entitlement granted on paid/active; revoked on cancel/expiry/refund
- [ ] License keys validated server-side where online
- [ ] Order/subscription IDs persisted for reconciliation
- [ ] Sandbox vs production separated; webhook secret server-side
- [ ] Webhook failures, churn, refund rates monitored
- [ ] MoR model used (no custom tax logic)