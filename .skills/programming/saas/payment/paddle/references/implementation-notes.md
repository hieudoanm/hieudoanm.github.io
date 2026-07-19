# Implementation notes

Focused reference for **paddle**, excerpted from SKILL.md. The skill file remains the canonical guide.

```ts
switch (event.event_type) {
  case "transaction.completed":
    await grantLicense(event.data.passthrough, event.data.payout);
    break;
  case "subscription.canceled":
    await revokeAtRenewal(event.data.subscription_id);
    break;
}
```

---

## 4. Data, Revenue & Operations

- Use **passthrough / `invoice_number` / transaction IDs** for external reconciliation
- **Keep receipts in your DB** (transaction + subscription IDs) as ground truth for support
- **MoR means tax is Paddle's responsibility** — don't hand-roll tax logic
- **Live vs sandbox** strictly separated; secrets (webhook secret) server-side
- Monitor:
  - **webhook failures / delivery lag**
  - **payment failures and failed checkouts**
  - **refund / chargeback rates**

---

## 5. General Rules of Thumb
