# Workflow notes

Focused reference for **polar**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
