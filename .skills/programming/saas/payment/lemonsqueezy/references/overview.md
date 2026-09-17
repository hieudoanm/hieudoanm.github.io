# Overview

Focused reference for **lemonsqueezy**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
