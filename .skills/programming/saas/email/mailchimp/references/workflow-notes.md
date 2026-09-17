# Workflow notes

Focused reference for **mailchimp**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
