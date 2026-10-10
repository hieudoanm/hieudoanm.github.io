# Overview

Focused reference for **klarna**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Klarna Best Practices

Klarna offers **Checkout (v2), Payment (v3), and Pay Later** products. Best practice is session-first integration: create a **Checkout Session** server-side, the client renders the iframe, your server **captures/holds the order** after authorization, and **webhooks** tell you the final state.

---

## 1. Core Stack & Concepts

- **Checkout v3**: `POST /payments/v1/sessions` → render iframe → `authorization_token`
- **Order Management**: `POST /ordermanagement/v1/orders/{order_id}/authorize`, then **capture**
- **Holds vs captures** — authorize reserves funds; capture settles; mismatch = missed money
- **Webhooks** for checkout/payment events (requires EU region typically)
- Environment: **Playground vs Production**; auth is basic (username:password)

```
Server ──create session──► Klarna ──render iframe──► Client approves
Client ──(order_id)──► Server ──capture──► Klarna
                              └─ webhooks ─► final state / notifications
```
