# Workflow notes

Focused reference for **dodopayments**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Integration & Checkout

- **Create checkout/session server-side** with amount + currency + metadata
- Pass **reference metadata** (user/order id) so webhooks reconcile to your records
- **Amounts always from server logic**, never client-supplied totals
- Use **subscription plans** defined on Dodo for recurring products
- Choose **SDK vs hosted checkout** consistently per flow (both safe), but never raw PAN handling

---

## 3. Webhooks & Entitlement

- **Verify webhook signature** (HMAC with webhook secret over raw body) before acting
- **Dedup events by event id** — consumers must be idempotent
- **Grant entitlements only on success/active events** (`payment.succeeded`, subscription active)
- **Revoke on subscription cancel/expire** and refund events
- When uncertain, **fetch the payment/subscription status via API** to reconcile

```ts
const mac = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (mac !== signature) return res.status(401).end();
// dedup → handle event → grant/revoke entitlement
```
