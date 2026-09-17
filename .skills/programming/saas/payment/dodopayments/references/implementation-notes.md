# Implementation notes

Focused reference for **dodopayments**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Data & Security

- **API/webhook secrets server-side only**; never in the client
- Store **payment/subscription ids + metadata** for reconciliation and support
- **No raw payment data in logs**; keep amounts/ids minimal
- **Sandbox (test) vs production** separated; use test keys for integration work

---

## 5. Reliability & Operations

- **Retry with backoff** on rate limits and transient errors; idempotent calls
- **Queue webhook processing** — a failure shouldn't lose entitlement events
- Monitor:
  - **webhook delivery failures / lag**
  - **payment failures and declines**
  - **subscription churn / failed renewals**
- **Region/availability awareness** — local methods vary by market; feature-flag accordingly
