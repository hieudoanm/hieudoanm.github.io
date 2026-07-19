# Review checklist

Focused reference for **resend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
