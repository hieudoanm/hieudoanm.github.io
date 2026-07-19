# Workflow notes

Focused reference for **paypal**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Checkout Integration

- **Create the order server-side** with amounts/currency; never take totals from the client
- **Capture after approval** (or immediate capture for one-phase); handle `COMPLETED` vs `APPROVED`
- **Two-phase**: `create` → client approves → you `capture`. Retry-capture on surprises
- Use **client token / JS SDK** for approval; session keeps `orderId` server-side
- **Never double-capture**: mark an order captured in your DB and idempotent-guard payments

---

## 3. Subscriptions & Billing

- **Create Product + Plan (billing cycle) + Subscription** via Catalog/Billing APIs
- Webhooks: `BILLING.SUBSCRIPTION.ACTIVATED`, `.CANCELLED`, `.SUSPENDED`, `.EXPIRED`
- Map subscription lifecycle → entitlements (grace on failure, revoke on cancel)
- Reconcile plan/currency changes as API-level updates, not DB hacks
