# Overview

Focused reference for **revenuecat**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
