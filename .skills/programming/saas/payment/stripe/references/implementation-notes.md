# Implementation notes

Focused reference for **stripe**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Data & Endpoints

- Use **metadata** on intents/customers to fan out your own reconciliation
- **Live vs test mode** kept strict (different keys, different secret); never point prod at test
- **Never log full card data or secrets**; store only Stripe IDs + last4 metadata wisely
- **PTA card data**: avoid storing raw PANs — use Stripe Tokens/Payment Elements

---

## 5. Reliability & Monitoring

- **Retry with backoff** on 429 / connection errors; honor rate limits
- **Downstream idempotence**: after `payment_intent.succeeded`, granting access must be idempotent (dedup by event/payment ID)
- Monitor:
  - **webhook failures / delivery lag**
  - **failed payments & disputes**
  - **balance/account negatives**
- Plan for **Stripe outages** — queues and retries over synchronous blocking

---

## 6. General Rules of Thumb
