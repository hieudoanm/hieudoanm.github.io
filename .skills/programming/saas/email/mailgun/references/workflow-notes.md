# Workflow notes

Focused reference for **mailgun**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
