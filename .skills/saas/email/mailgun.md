---
name: mailgun
description: Best practices for sending and receiving email with Mailgun. Use when integrating transaction email, configuring inbound routing, or handling delivery events — covers sending API, inbound parsing, webhooks, and deliverability.
---

# Mailgun Best Practices

Mailgun is an email API strong at both **sending** and **inbound email processing** (routes/webhooks). Best practice is authenticating domains properly, using webhooks for delivery truth, and leveraging **inbound routes** to parse replies/notifications into your application.

---

## 1. Core Stack & Concepts

- **Send API** for transactional email; **Message Login/Retry** for rebuilds
- **Sending**: REST send, MIME support, template variables
- **Inbound**: **Routes** forward incoming email to your URL as parsed events/webhooks
- **Webhooks** deliver events: delivered, opened, clicked, delivered, failed, unsubscribed
- **Storage API / Message Body** for retrieving raw messages

```bash
curl -s --user "api:$MAILGUN_API_KEY" \
  https://api.mailgun.net/v3/mg.acme.com/messages \
  -F from="Acme <no-reply@mg.acme.com>" \
  -F to="user@example.com" \
  -F subject="Verify your email" \
  -F text="Your code is 1234"
```

---

## 2. Sending Integration

- **Verify your domain** (SPF/DKIM) and use a domain you control (not mailgun.org) in production
- Send **one message per request**; async, off the hot path
- Use **template variables + handles** for content management
- **Batch where appropriate** (recipient variables) but respect reputation and throttling
- Keep **API keys scoped server-side**; store only the send-key, not the account key

---

## 3. Inbound & Processing

- Configure **inbound routes** (`catch_all` / specific addresses) to POST parsed events to your endpoint
- **Verify webhook signatures** (HMAC) before trusting data
- Handle **MIME attachments/list-unsubscribe** properly when parsing
- **Respond to replies**: devices/notifications that reply → route to correct task/thread
- **Never trust recipient input** in inbound payloads without validation

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