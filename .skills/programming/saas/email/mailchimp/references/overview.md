# Overview

Focused reference for **mailchimp**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
