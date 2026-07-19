# Implementation notes

Focused reference for **lemonsqueezy**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. MoR & Compliance

- **You do not charge tax** — LS is the seller of record; don't hand-roll VAT/sales tax
- Keep **transaction/order + subscription ids** in your DB for refunds/disputes
- On **refund/dispute**: revoke entitlement consistent with your product policy
- Prefer **annual/unlimited** where rejection risk is low (MoR reduces, not removes, chargeback risk)

---

## 5. Reliability & Operations

- **Retry/queue webhook processing** — LS retries failures; your consumer must be idempotent
- **Sandbox vs production** keys separated; webhook secret server-side only
- Monitor:
  - **webhook delivery failures/lag**
  - **subscription churn and payment failures**
  - **refund / dispute rates**
- Mind **LS → Stripe migration** if you onboard onto Stripe-backed subscription features

---

## 6. General Rules of Thumb
