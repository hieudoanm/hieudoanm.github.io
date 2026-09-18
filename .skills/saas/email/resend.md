---
name: resend
description: Best practices for sending transactional email with Resend. Use when integrating outbound email, handling bounces, or setting up templates — covers API usage, deliverability, webhooks, and reliability.
---

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

```ts
// bounce webhook → remove address from future sends
if (payload.data && payload.data.event === "email.bounced") {
  await suppressionList.add(payload.data.email);
}
```

---

## 4. Reliability & Operations

- **Retry with backoff on 4xx/5xx** (429 rate limit, 500) — idempotent sends only
- Handle **rate limits** explicitly; batch vs throttle according to plan
- **Secret/API key server-side only**; never in client bundles
- Keep **templates + addresses** data-separated (PII minimal; email = personal data)
- Monitor:
  - **send success/failure rates**
  - **bounce/complaint rates per domain**
  - **webhook processing lag**
- **Log event IDs**, not full payloads; keep privacy in mind

---

## 5. General Rules of Thumb

- **Email is a deliverability system, not just an API** — DNS verification and event handling matter more than the send call
- **Webhooks over polling** — track lifecycle, react to bounces/complaints
- **Async + idempotent + rate-limit-aware** — the reliability contract
- **Respect the ecosystem** — suppression and reputation protect future sends

---

## Quick-Start Checklist

- [ ] Verified domain with DKIM/SPF/DMARC in production (not resend.dev sender)
- [ ] One email per call; async sending; server-side only secrets
- [ ] React Email/server-rendered templates; versioned
- [ ] Webhooks consume delivered/bounced/complained/open events
- [ ] Bounces/complaints fed into suppression list
- [ ] Retry with backoff on 429/5xx; idempotency where duplicates matter
- [ ] Bounce/complaint rates monitored; domain warmed up
- [ ] Minimal PII; event-ids logged, payloads not