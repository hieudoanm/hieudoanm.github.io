# Review checklist

Focused reference for **sendgrid**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
