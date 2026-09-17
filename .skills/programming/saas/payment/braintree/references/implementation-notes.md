# Implementation notes

Focused reference for **braintree**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Webhooks & Verification

- **Verify webhook payloads** with your Braintree public key (HMAC signature) — never trust raw POSTs
- **Dedup events** by webhook id before applying (delivery can repeat)
- On `transaction_settled`/`subscription_charged_successfully`: grant access idempotently
- Handle **disputes/chargebacks** — revoke entitlement on confirmed cases
- **Ack quickly** and fail-queue webhook processing so Braintree doesn't keep retrying

---

## 5. Security & Operations

- **Credentials server-side**: merchant ID + keys (public/private) never in the client
- **Validate nonces are from your merchant account**; protect the Drop-in token surface
- **No PAN/CCV logging**, even masked copy-paste; store `transaction.id` as ground truth
- Monitor:
  - **webhook failures**
  - **decline rates and gateway errors**
  - **chargeback / dispute rates**
- **Graceful gateway outage handling** — never block a user request on the gateway sync
