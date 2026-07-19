# Overview

Focused reference for **resend**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Resend Best Practices

Resend is a developer-focused email API for transactional and marketing email. Best practice is treating email as a **deliverability engineering problem**: single recipient-focused API calls, webhooks for events (delivered/opened/bounced/complained), proper DNS/DKIM/SPF setup, and idempotent by-email retry handling.

---

## 1. Core Stack & Concepts

- **REST API + SDKs** for sending; **React Email** for composing server-rendered templates
- **Emails API** (`/emails`) for transactional send
- **Webhooks** for delivery events — not polling send status
- **Domains** must be verified with **DKIM/SPF/DMARC** to protect deliverability
- **Broadcasts** for bulk/marketing (with suppression handling)

```ts
import { Resend } from "resend";

const client = new Resend(process.env.RESEND_API_KEY);
await client.emails.send({
  from: "Acme <no-reply@acme.com>",
  to: ["user@example.com"],
  subject: "Verify your email",
  react: <VerifyEmail code={code} />,
});
```
