# Review checklist

Focused reference for **paddle**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Let Paddle be the merchant of record** — tax, invoices, refunds are theirs
- **Webhooks drive entitlements** — fulfillment reacts to paid/active state
- **Meta/passthrough ties it together** — reconcile against your users
- **Secrets verified and server-side** — never trust unverified webhooks

---

## Quick-Start Checklist

- [ ] Catalog products/prices defined; checkout integrated for one-time + subscription
- [ ] passthrough/target carries user/order references for reconciliation
- [ ] Webhook signatures verified; events deduped by id
- [ ] Access granted only on paid/active states; grace handled for failures
- [ ] Refunds/chargebacks revoke entitlement
- [ ] Transaction/subscription IDs persisted as ground truth
- [ ] Sandbox vs live separated; webhook secrets server-side
- [ ] Webhook/lag, payment failures, refund rates monitored
