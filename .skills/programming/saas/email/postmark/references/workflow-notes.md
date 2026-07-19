# Workflow notes

Focused reference for **postmark**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
