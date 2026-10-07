---
name: postmark
description: Best practices for transactional email with Postmark. Use when sending app-triggered email reliably, handling bounces, or setting up delivery events — covers the send API, deliverability defaults, and reputation management.
---

# Postmark Best Practices

Postmark is a transactional-email-only service (it rejects marketing/bulk by policy). Best practice is using it for **behavioral, app-triggered email** with high deliverability expectations: plain send API + templates, webhooks for bounces, and strict suppression handling.

---

## 1. Core Stack & Concepts

- **Send API** for transactional email; **Deposit API** (beta) for inbound/replies
- **Templates** (API + dashboard) for structured messages
- **Webhooks** for delivery events (delivered, bounced, opened, clicked, spam complaint)
- **Suppressions** for hard bounces / spam complaints automatically enforced
- **Transactional-only policy** — don't route marketing blasts through Postmark

```bash
curl -X POST https://api.postmarkapp.com/email \
  -H "X-Postmark-Server-Token: $POSTMARK_TOKEN" \
  -H "Accept: application/json" -H "Content-Type: application/json" \
  -d '{
    "From":"no-reply@acme.com",
    "To":"user@example.com",
    "Subject":"Verify your email",
    "HtmlBody":"<p>Your code is 1234</p>",
    "MessageStream":"outbound"
  }'
```

---

## 2. Integration & Sending

- **Use Message Streams** to separate e.g. transaction vs notification streams with independent deliverability reputation
- Send **asynchronously** — never block web requests
- Use the **Template API** (`/email/with-template`) for consistent, reviewable email
- One call per message with a **verified `From` sender signature**
- Keep **Server Tokens scoped** and server-side only; separate tokens per environment

---

## 3. Deliverability & Events

- **Verify your sending domain** (SPF/DKIM/DMARC) before send volume ramps
- **Consume webhooks** for bounced/spam-complaint and react (unsubscribe, alert)
- Postmark records **automatic suppressions** on hard bounces/spam — honor the same list in-app
- **Monitor bounce rate and complaint rate** per message stream
- Read/respond to **delivery feedback** — Postmark surfaces conversion-relevant metrics

---

## 4. Reliability & Operations

- **Retry with backoff** on 422 (validation), 429 (rate limit), and 5xx — idempotent
- 200 means **accepted**, not delivered — delivery truth is in the webhooks
- Handle **rate limits / throughput plans** deliberately
- **PII-aware**: emails are personal data — minimal retention, aligned with policy

---

## 5. General Rules of Thumb

- **Transactional means behavioral** — Postmark is not a campaign tool
- **Streams isolate reputation** — separate transactional from notifications
- **Webhooks are the delivery truth** — bounces surface vs silently slipping
- **Suppression is proactive** — let Postmark + your list both prune

---

## Quick-Start Checklist

- [ ] Verified sender domain (SPF/DKIM/DMARC) with sender signature configured
- [ ] Transactional-only use; message streams separated by purpose
- [ ] Scoped server tokens; async sending; no client-side secrets
- [ ] Webhooks consumed for delivered/bounced/complained
- [ ] In-app suppression aligns with Postmark's automatic suppressions
- [ ] Retry with backoff on 422/429/5xx; 200 ≠ delivered
- [ ] Bounce/complaint rates monitored per stream
- [ ] Minimal email/PII retention