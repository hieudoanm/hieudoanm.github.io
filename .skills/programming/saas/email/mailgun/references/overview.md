# Overview

Focused reference for **mailgun**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
