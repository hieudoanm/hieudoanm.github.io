# Workflow notes

Focused reference for **clerk**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Integration Patterns

- Place **`<ClerkProvider>` once** at the app root; let components inherit auth state
- Use **server SDKs/middleware** to read `userId` and `sessionClaims` on the backend
- **Protect routes server-side**, not just with client-side redirects
- **Webhooks** (with signature verification) are the way to consume user/organization events — seed your own data
- Use `clerkClient.users.getUser` sparingly — prefer session claims to avoid extra API calls

---

## 3. Authorization & Trust

- **Authorization from claims, not client state** — `sessionClaims`/roles drive decisions server-side
- With **Handshake/orgs**, use `orgId` + `orgRole`/`orgPermissions` claims for scoped access
- **Verify webhook signatures** (SVIX) before trusting event payloads
- Never accept a user-supplied id or org claim without validating against the verified session
