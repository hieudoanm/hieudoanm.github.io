# Implementation notes

Focused reference for **square**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Data & Security

- **Per-seller tokens** — separate access tokens per merchant/location, rotated
- **Never log card data or tokens**; store only payment/order IDs
- **Location awareness**: payments are against a location — choose the right one
- **Secrets and tokens server-side only**; never in the client bundle

---

## 5. Reliability & Operations

- **Retry with backoff** on rate limits (429) and transient errors, using fresh idempotency keys
- Monitor:
  - **webhook delivery failures**
  - **payment failures / declines**
  - **subscription cancellations and retry failures**
- Plan for **Square outages** — queue + retry over blocking the request path
