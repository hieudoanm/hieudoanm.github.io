# Implementation notes

Focused reference for **mailgun**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Deliverability & Events

- **Consume webhooks** and maintain suppression for bounces/unsubscribes/spam reports
- **Stop sending to hard-bounced/complained addresses**
- **Monitor bounce + complaint rates**; warm up domains
- Track **open/click** only where meaningful (transactional often doesn't need it)
- With **EU/GDPR**, mind that email addresses are personal data — minimize retention

---

## 5. Reliability & Operations

- **Retry with backoff** on 429/5xx; accept 200 as queued-not-delivered
- Webhook consumer must **ackonwledge quickly** and be idempotent (duplicate events happen)
- **Buffer/fail-queue** inbound processing when your endpoint is down; Mailgun retries
