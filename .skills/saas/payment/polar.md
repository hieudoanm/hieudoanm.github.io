---
name: polar
description: Best practices for monetizing open-source and digital products with Polar. Use when selling subscriptions, one-time purchases, or handling donations/pledges — covers checkout, benefits, webhooks, and the open-source ISV model.
---

# Polar Best Practices

Polar is a payments platform aimed at **open-source monetization** — subscriptions, one-time purchases, donations, and benefits attached to repos/products, with the merchant-of-record handling tax. Best practice is letting Polar own checkout/tax, consuming **webhooks** for entitlement state, and treating **benefits** (license keys, repo access, Discord roles) as the product surface you grant.

---

## 1. Core Stack & Concepts

- **Products** (one-time purchases) and **subscriptions** (recurring) with **benefits**
- **Benefits** are the deliverables you control: license keys, private repo access, community roles
- **Storefront/Checkout** is Polar-hosted; embed via link or overlay
- **Merchant of record** — Polar handles tax and invoicing for your sales
- **Webhooks** for order/subscription events

---

## 2. Checkout & Product Model

- Define **products + tiers** (Free/Pro/Team as subscriptions or one-time) with per-tier **benefits**
- Pass **`custom metadata`** (user id, org) on orders/subs for reconciliation
- **Amounts from your catalog only** — never compute totals client-side
- Offer **presale/preorder or donante/PRO tiers** deliberately; keep the free tier a real product
- Tooling: **Polar SDKs (JS/TS/Python)** for API + webhook integration

---

## 3. Webhooks & Entitlement

- **Verify webhook signatures** (HMAC on raw body) before trusting payloads
- **Dedup by event id** — retries deliver duplicates
- Handle canonical events:
  - `order.updated` / `order.paid`
  - `subscription.active` / `subscription.revoked` / `subscription.canceled` / `subscription.expired`
- **Grant benefits on paid/active only**; revoke on revoke/cancel/expire
- For **license keys**: generate/return the key in a benefit handler, and validate server-side when consumed

```ts
switch (event.type) {
  case "subscription.active":
    await grantBenefits(event.data.subscription); // license keys, repo access, roles
    break;
  case "subscription.revoked":
    await revokeBenefits(event.data.subscription);
    break;
}
```

---

## 4. Open-Source & Community

- Map **repo → product/benefit** so funding traces to deliverables (e.g., private Discord, sponsor role)
- **Pledges/donations** are part of the model — support "sponsor me" without an Apple-tax equivalent
- **License keys for desktop/cli** tools — key is proof of purchase; verify against Polar API where online
- Use **campaigns/ads/SRM** features only if they match your monetization; otherwise, keep the surface focused

---

## 5. Reliability & Operations

- **Retry/backoff webhook consumer**; idempotent handlers (dedup by event id)
- Persist **order/subscription ids** in your DB as ground truth for support/refund handling
- **Sandbox vs production** separated; webhook secret server-side only
- Monitor:
  - **webhook failures / lag**
  - **subscription churn and failed renewals**
  - **benefit grant failures** (license generation, repo invite)
- **MoR tax handling** means leaning on Polar's invoices, not your own VAT logic

---

## 6. General Rules of Thumb

- **Benefits are the product** — entitlements you grant based on paid/active state
- **Polar is the MoR** — tax/invoicing is theirs; fulfillment is yours
- **Webhooks are truth** — verify, dedup, grant/revoke deliberately
- **Metadata/ids connect** — correlation with your users is prerequisite to fulfillment

---

## Quick-Start Checklist

- [ ] Products/tiers + benefits defined; checkout integrated
- [ ] Metadata (user/org) passed for reconciliation
- [ ] Webhook signatures verified; events deduped
- [ ] Benefits granted on active/paid; revoked on revoke/cancel/expire
- [ ] License keys generated + validated server-side where online
- [ ] Order/subscription ids persisted; sandbox/prod separated
- [ ] Webhook failures, churn, grant failures monitored
- [ ] MoR model used; no custom tax logic