# Overview

Focused reference for **postmark**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
