# Review checklist

Focused reference for **clerk**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] `<ClerkProvider>` at root; sign-in/up, profile, orgs using prebuilt components
- [ ] Server-side session/route protection; `userId` + claims read on the backend
- [ ] Webhooks (signature-verified) sync users/orgs to your data store
- [ ] Authorization from verified `sessionClaims`/org permissions, never client state
- [ ] MFA and rate limits configured for production
- [ ] Secrets server-side only; no token/secret logging
- [ ] Session expiry, refresh, sign-out handled via Clerk flows
- [ ] `getUser` used sparingly; claims preferred over extra API calls
