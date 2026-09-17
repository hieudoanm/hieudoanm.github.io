# Workflow notes

Focused reference for **resend**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration & Sending

- **Send one message per call** with a clear `from` (verified domain, not the default `onboarding@resend.dev` in prod)
- **Validate sender domain** — verified domain matters for deliverability
- **Send asynchronously** — never block a user request on email I/O
- Associate a **stable idempotency key** per message where duplicate suppression matters
- **Compose server-side** (React Email) and keep templates versioned

---

## 3. Deliverability & Events

- **Configure DKIM/SPF/DMARC** in your DNS; verify the domain in the dashboard
- **Consume webhooks** to track delivered/opened/clicked/bounced/complained
- On **bounce or complaint**: stop sending to that address, log, and maintain suppression
- **Monitor bounce/complaint rates** — sustained high rates degrade your reputation
- **Warm up** new domains/volumes gradually
