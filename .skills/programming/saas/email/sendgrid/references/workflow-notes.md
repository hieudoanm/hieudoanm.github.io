# Workflow notes

Focused reference for **sendgrid**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
