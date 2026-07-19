# Review checklist

Focused reference for **postmark**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] Verified sender domain (SPF/DKIM/DMARC) with sender signature configured
- [ ] Transactional-only use; message streams separated by purpose
- [ ] Scoped server tokens; async sending; no client-side secrets
- [ ] Webhooks consumed for delivered/bounced/complained
- [ ] In-app suppression aligns with Postmark's automatic suppressions
- [ ] Retry with backoff on 422/429/5xx; 200 ≠ delivered
- [ ] Bounce/complaint rates monitored per stream
- [ ] Minimal email/PII retention
