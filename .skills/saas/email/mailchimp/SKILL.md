---
name: mailchimp
description: Best practices for email marketing and audience management with Mailchimp. Use when running campaigns, managing audiences/automations, or integrating sign-ups — covers audience management, campaigns, and deliverability.
---

# Mailchimp Best Practices

Mailchimp is a **marketing email platform** (campaigns, audiences, automations) — not a transactional mail service. Best practice is separating concerns: Mailchimp owns marketing/audience communication; your app sends transactional email elsewhere. Drive audiences from consent, honor suppression, and treat deliverability as reputation management.

---

## 1. Core Stack & Concepts

- **Audiences** (lists) with tags/segments for targeting
- **Campaigns** (bulk email), **automations** (triggered journeys), **templates**
- **Forms/landing pages** for sign-ups
- **API** (v3) for audience sync, tags, and transactional? (Note: use a transactional sender instead)
- **Delete/suppress**: mandatory for GDPR/consent correctness

```
App sign-up ──(API)──► Mailchimp audience (+ tags)
                          │
                          ├─ campaigns / automations
                          ├─ segment = tag + status
                          └─ unsubscribe/suppression honored
```

---

## 2. Integration & Audience Management

- **Sync audiences from your app via API** (marketing-consent opt-ins only; use subscriber status properly)
- Use **tags and segments** rather than duplicate lists
- **Honor consent states** — `subscribed`, `unsubscribed`, `cleaned`, `pending`
- **Keep contact data minimal** and deletion-exportable (GDPR angles)
- Guard against **list bloat** — clean, merge, and suppress consistently

---

## 3. Campaigns & Automation

- Prefer **automations** for lifecycle/journey mail (welcome, onboarding, re-engagement)
- Use **campaigns** for deliberate sends (digests, newsletters) — not every app event
- **Personalize** with merge tags/templates; segment smartly, don't blast
- Prefer **transactional service for password-resets/notices**; Mailchimp for marketing — don't mix

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

---

## Quick-Start Checklist

- [ ] Audiences synced (consent-aware) via API with proper subscriber status
- [ ] Tags/segments used; no duplicate or bloated lists
- [ ] Automations for lifecycle/journey; campaigns for deliberate sends
- [ ] Transactional email NOT sent through Mailchimp
- [ ] Verified domain (SPF/DKIM/DMARC); consent + unsubscribe honored
- [ ] Bounce/click/complaint rates monitored; suppression maintained
- [ ] Contact data minimal, exportable/deletable for compliance
- [ ] Sender reputation warmed up for new domains/volumes