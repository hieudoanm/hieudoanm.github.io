# Overview

Focused reference for **sendgrid**, excerpted from SKILL.md. The skill file remains the canonical guide.

# SendGrid Best Practices

SendGrid is the Twilio email platform for transactional and marketing email. Best practice is treating it as a **deliverability pipeline**: authenticated sender domains (DKIM/SPF/DMARC), a single sending strategy per type, and event webhooks over polling to react to bounces/complaints.

---

## 1. Core Stack & Concepts

- **Send API** (`/v3/mail/send`) for transactional email; **Marketing/SendGrid** for campaigns
- **Sender authentication**: domain verification (SPF/DKIM), optional DMARC + link-branding
- **Suppression groups** for unsubscribe control
- **Event webhooks** (delivered, processed, deferred, bounced, open, click, spam report)
- **Personalization** via multiple `personalizations` blocks (note: avoid abuse)

```bash
curl -X POST https://api.sendgrid.com/v3/mail/send \
  -H "Authorization: Bearer $SENDGRID_API_KEY" -H "Content-Type: application/json" \
  -d '{
    "from": {"email":"no-reply@acme.com","name":"Acme"},
    "personalizations":[{"to":[{"email":"user@example.com"}]}],
    "subject":"Verify your email",
    "content":[{"type":"text/plain","value":"Your code is 1234"}]
  }'
```
