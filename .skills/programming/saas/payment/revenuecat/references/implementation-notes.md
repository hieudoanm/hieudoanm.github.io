# Implementation notes

Focused reference for **revenuecat**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Trials, Promotions & Store Compliance

- Use **offerings + intro offers** via the SDK/paywall to drive trials; monitor **trial->paid conversion**
- **NEW app store rules**: external purchase links (EU store policies) — keep RC and any external flow aligned on entitlement state
- **Refund/chargeback** events (`CUSTOMER_ENTITLEMENT_REVOKED`) must revoke access
- Keep **Paywall / onboarding copy** consistent with entitlements to reduce support load

---

## 5. Reliability & Operations

- **Verify webhook auth** (Authorization: Bearer RC Webhook Secret) before processing
- **Idempotent webhook handling** — dedup by event id; retries expected
- **Reconcile periodically** via `GET /subscribers` to catch lag between webhooks and truth
- Monitor:
  - **entitlement grant/revoke spikes**
  - **webhook failures / delivery lag**
  - **trial conversion and churn**
- **Secrets server-side**; RC API key scoped, rotated; no receipts/keys logged

---

## 6. General Rules of Thumb
