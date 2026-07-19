# Implementation notes

Focused reference for **paypal**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Webhooks & Verification

- **Verify webhook signatures**: get the verification cert via `/v1/notifications/verify-webhook-signature` with raw body + request headers
- **Dedup events** by `event_id` before applying
- On `PAYMENT.CAPTURE.COMPLETED`, **grant access idempotently** (store capture id)
- Handle **`PAYMENT.CAPTURE.DENIED`**, refunds, and **disputes (chargebacks)** — revoke entitlement on confirmed cases
- Poll/`GET` the order to **reconcile discrepancies**; webhooks can lag

---

## 5. Security & Operations

- **Access token cached** (don't fetch per request); scoped to your app credentials
- **Client ID/secret server-side only**; never in frontend bundles
- **OAuth2 and IPN are legacy** — prefer v2 API + REST webhooks for new integrations
- Monitor:
  - **webhook failures / delivery lag**
  - **capture/denial rates**
  - **dispute/chargeback counts**
