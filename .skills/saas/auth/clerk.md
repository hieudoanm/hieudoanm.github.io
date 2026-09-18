---
name: clerk
description: Best practices for adding authentication to modern apps with Clerk. Use when wiring up sign-in/sign-up, sessions, organization support, or webhooks — covers session validation, frontend/backend patterns, and identity data.
---

# Clerk Best Practices

Clerk is a developer-friendly authentication service with prebuilt components and session management. Best practice is leaning on its **sessions and prebuilt components** for speed while keeping authorization server-side: validate sessions (JWT or webhooks) in your backend, sync identity via webhooks, and never trust client-only state.

---

## 1. Core Stack & Concepts

- **Sessions** replace manual JWT plumbing — Clerk manages lifecycle, refresh, and storage
- **Prebuilt components**: `<SignIn />`/`<SignUp />`, user profiles, account switcher
- **Session tokens**: Clerk JWTs validated against Clerk JWKS, or **Frontend API session cookies**
- **Webhooks** stream user/organization/session events to your backend
- **Organizations** give multi-tenant group management

```ts
// backend middleware validates Clerk session token locally via JWKS
import { createClerkClient } from "@clerk/backend";
const client = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
app.use(async (req, res, next) => {
  const auth = await client.authenticateRequest(req);
  if (!auth.isSignedIn) return res.status(401).send("Unauthorized");
  res.locals.user = auth.toAuth().userId;
  next();
});
```

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