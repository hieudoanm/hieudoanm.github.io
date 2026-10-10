# Overview

Focused reference for **clerk**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
