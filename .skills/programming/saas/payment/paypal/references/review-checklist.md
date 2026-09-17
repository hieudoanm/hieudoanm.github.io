# Review checklist

Focused reference for **paypal**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Orders v2 + webhooks** — modern API, not classic buttons/IPN
- **Capture is the money event** — grant access on capture completion, idempotently
- **Verify everything** — webhook signatures and order status via API
- **Server-side money math** — amounts never client-supplied

---

## Quick-Start Checklist

- [ ] Orders v2 (create → capture) integrated; two-phase handled
- [ ] Amounts computed server-side; order id reconciled in DB
- [ ] Webhook signatures verified; events deduped by event_id
- [ ] Capture completion grants access idempotently (capture id stored)
- [ ] Subscriptions mapped to entitlements (active/canceled/expired)
- [ ] Refunds/disputes revoke entitlement on confirmations
- [ ] Access tokens cached; credentials server-side only
- [ ] Webhook/lag, denial rates, dispute counts monitored
