# Review checklist

Focused reference for **mailgun**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. General Rules of Thumb

- **Sending and receiving are two systems** — outbound deliverability, inbound routes
- **Webhooks are the truth, not the send 200**
- **Reputation is managed**: suppression + monitoring + warmups
- **Trust is verified**: signatures on inbound/webhook payloads

---

## Quick-Start Checklist

- [ ] Domain verified (SPF/DKIM); own domain in production
- [ ] One message per request; async; scoped API keys server-side
- [ ] Inbound routes parse replies/notifications to your endpoint
- [ ] Webhook + route signatures verified (HMAC)
- [ ] Suppression list maintained from bounces/unsubscribes/spam reports
- [ ] Retry with backoff on 429/5xx; 200 ≠ delivered
- [ ] Bounce/complaint rates + inbound failures monitored
- [ ] Minimal retention of email/PII; idempotent webhook consumers
