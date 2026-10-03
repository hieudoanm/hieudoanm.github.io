---
name: sendgrid
description: Best practices for sending email with Twilio SendGrid. Use when integrating transactional/marketing email, configuring sender authentication, or handling delivery events — covers API usage, deliverability, and event webhooks.
---

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

---

## 2. Integration & Sending

- **Verify and authenticate your sending domain(s)** — it is the prerequisite for deliverability
- **One transactional send API** for app email; use Marketing for campaigns, not the Send API at scale
- Use **dynamic templates** in the dashboard for structured, reviewable email
- Send **asynchronously** off the request path
- Store **API keys as scoped server-side secrets** (send-only keys, not the console/admin key)
- If the email is in-app lifecycle, prefer **SendGrid templates + transactional send** over bespoke HTML assembly

---

## 3. Deliverability & Events

- **Consume Event Webhooks** (HTTPS POST) for delivered/bounced/spam-reports — don't poll
- Maintain a **suppression/unsubscribe list** from spam reports and unsubscribes
- **Stop sending to bounced/complained addresses** — reputation is shared across the domain
- **Monitor bounce rate and spam report rate** per sending domain/stream
- Warm up new domains or new sending streams gradually

```js
// bounce webhook → suppress address
if (event.event === "bounce" || event.event === "spamreport") {
  await suppressionList.add(event.email);
}
```

---

## 4. Reliability & Operations

- **Retry with backoff** on 429 (rate-limited) and 5xx; treat 2xx as accepted (delivery is async)
- Understand **throttling** — plan send rates within your plan's limits
- Handle **async delivery** — a 202 means queued, not delivered; rely on events for truth
- Keep **template + recipient data minimal** and PII-aware
- Monitor:
  - **send failure/error rates**
  - **bounce + spam-report rates**
  - **delivery latency (processed → delivered)**
  - **webhook processing lag**

---

## 5. General Rules of Thumb

- **Sender authentication first** — deliverability lives in DNS, not code
- **Webhooks are the truth; 202 is not delivery** — manage expectations from events
- **Reputation is shared** — suppression and monitoring are non-negotiable
- **Async, throttled, retried** — the sending reliability contract

---

## Quick-Start Checklist

- [ ] Sending domain verified (SPF/DKIM/DMARC); no naked/root defaults in prod
- [ ] Transactional via Send API or dynamic templates; Marketing for campaigns
- [ ] Scoped API keys server-side only
- [ ] Event webhooks consumed for delivered/bounced/spam-report
- [ ] Suppression list honored + maintained from events
- [ ] Retry with backoff on 429/5xx; throttle within limits
- [ ] Bounce/spam rates + latency monitored
- [ ] Minimal PII; async sending off the request path