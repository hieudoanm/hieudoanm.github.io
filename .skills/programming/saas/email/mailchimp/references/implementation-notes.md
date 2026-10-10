# Implementation notes

Focused reference for **mailchimp**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Deliverability & Compliance

- **Verify your sending domain** (SPF/DKIM/DMARC in Mailchimp settings)
- **Consent matters**: only send to opted-in audiences; honor unsubscribe
- Track **open/click/bounce rates**; react to complaints
- **Warm up sender reputation** for new domains/volumes
- Mind **regional compliance** (GDPR/CCPA/CAN-SPAM) — processes over one-off fixes

---

## 5. General Rules of Thumb

- **Marketing owns Mailchimp; transactional lives elsewhere** — the clean split
- **Consent is data** — status and tags are your targeting contract
- **Reputation is continuous** — suppression, warmup, and monitoring
- **Segments beat blasts** — smart targeting over volume
