# Implementation notes

Focused reference for **clerk**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 4. Security & Operations

- **Rate limits / MFA** configured in the Clerk dashboard; enforce for sensitive actions
- **Never log tokens, session cookies, or webhook secrets**
- Store `CLERK_SECRET_KEY` server-side only
- Keep session rotation/fresh behavior to Clerk; don't hand-roll token refresh
- Handle **session expiration and sign-out flows** cleanly in the UI

---

## 5. General Rules of Thumb

- **Clerk handles the UX; you handle authorization** — sessions in the client, claims on the server
- **Sync, don't duplicate** — webhooks feed your data store; the client is not a database
- **Trust verified claims and webhooks only** — everything else is input
- **Use the prebuilt pieces** — reinventing sign-in flows is the main anti-pattern
