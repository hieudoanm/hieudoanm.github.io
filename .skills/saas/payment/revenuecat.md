---
name: revenuecat
description: Best practices for in-app purchases and subscriptions with RevenueCat. Use when integrating IAP on iOS/Android (and web), managing entitlement state, or this offering trial promotions — treats RevenueCat as the entitlement source of truth for native stores.
---

# RevenueCat Best Practices

RevenueCat abstracts **App Store / Play Store IAP** into one API — products, purchases, entitlements, and webhooks. Best practice is treating RevenueCat as the **single source of entitlement truth**: purchase through their SDK, consume their webhooks for the backend, and only grant features when entitlements are active.

---

## 1. Core Stack & Concepts

- **Entitlements ↔ Products ↔ Offerings**: offerings = your curated product groupings; entitlements = what the user "owns"
- **SDKs** for iOS/Android (and web via RevenueCat Web + Stripe)
- **Webhooks** fire on events like `CUSTOMER_ENTITLEMENT_CREATED`, `CUSTOMER_ENTITLEMENT_REVOKED`, `SUBSCRIPTION_CANCELLED/EXPIRED`, `INITIAL_PURCHASE`, `RENEWAL`, `TRANSFER`
- **App store receipts** handled by RC — you don't parse Apple/Google receipts

```
SDK purchase ──► RevenueCat ──► (state: active entitlements)
                   │
                   └─► Webhooks ──► your backend (entitlement sync)
```

---

## 2. Integration & SDK Use

- **Configure offerings/products in the dashboard**, referenced by ID in code
- Handle **purchase success → check entitlement** on the client, but **persist server-side via webhook**
- **Respect platform rules**: consumables, non-consumables, auto-renew only where store policies allow
- **Package/offering IDs stable** — don't change IDs across versions casually
- Test with **sandbox/TestFlight + RC sandbox** before release; separate RC keys per env

---

## 3. Entitlements & Backend Truth

- **Verify entitlement status server-side** through SDk/webhook or `GET /subscribers/{app_user_id}` — don't trust client-side flags for security-sensitive features
- **Cache entitlement lookups with timeout** — don't hit RC on every request
- **Webhooks carry the truth**: subscribe to the canonical events, verify API keys, dedup by event id
- Map **active entitlement → feature access**; revoke when entitlements are revoked/expire
- **Handle subscription transfers and proration** events to keep state consistent

```ts
// backend reflects webhook: grant/revoke entitlement server-side
switch (event.type) {
  case "CUSTOMER_ENTITLEMENT_CREATED": await grant(event.app_user_id, event.entitlement_id); break;
  case "CUSTOMER_ENTITLEMENT_REVOKED": await revoke(event.app_user_id, event.entitlement_id); break;
}
```

---

## 4. Trials, Promotions & Store Compliance

- Use **offerings + intro offers** via the SDK/paywall to drive trials; monitor **trial->paid conversion**
- **NEW app store rules**: external purchase links (EU store policies) — keep RC and any external flow aligned on entitlement state
- **Refund/chargeback** events (`CUSTOMER_ENTITLEMENT_REVOKED`) must revoke access
- Keep **Paywall / onboarding copy** consistent with entitlements to reduce support load

---

## 5. Reliability & Operations

- **Verify webhook auth** (Authorization: Bearer RC Webhook Secret) before processing
- **Idempotent webhook handling** — dedup by event id; retries expected
- **Reconcile periodically** via `GET /subscribers` to catch lag between webhooks and truth
- Monitor:
  - **entitlement grant/revoke spikes**
  - **webhook failures / delivery lag**
  - **trial conversion and churn**
- **Secrets server-side**; RC API key scoped, rotated; no receipts/keys logged

---

## 6. General Rules of Thumb

- **RC = source of truth** for entitlements across native stores
- **Webhooks + API sync** — client SDKs are entry points, not authority
- **Entitlement-aware features** — gate code paths on active entitlements, not store receipt hacks
- **Store compliance respected** — offerings, paywalls, trials aligned with policy

---

## Quick-Start Checklist

- [ ] Offerings/products configured; SDK integrated on each platform
- [ ] Purchase → entitlement flow tested in sandbox; RC keys per env
- [ ] Webhooks verified + deduped; entitlement events processed backend
- [ ] Server-side entitlement checks (SDK verify / API) not client-only flags
- [ ] Revoke on entitlement revoked/expired; refunds handled
- [ ] Offers/trials monitored for conversion; transfer/proration handled
- [ ] Periodic reconciliation vs subscribers endpoint
- [ ] Secrets server-side; grant/revoke and webhook failures monitored