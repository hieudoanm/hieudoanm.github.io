---
name: auth-js-best-practices
description: Best practices for authentication in JS apps with Auth.js (NextAuth) — the auth conventions for React/Next framework apps. Use when writing, structuring, or reviewing Auth.js — covers providers, session/JWT strategy, callbacks, database sessions, and security hygiene.
---

# Auth.js Best Practices

Auth.js (NextAuth) is the **authentication library for Next.js/React apps** — provider-agnostic (`Credentials`, OAuth/OIDC, Email), with **session strategy (`jwt`/`database`), `callbacks`, and `adapters`** as its knobs. Practical Auth.js leans on **a single, typed `auth` config with providers declared for the app's real flows, a deliberate session strategy (JWT for stateless/edge, DB for long-lived/roles), callbacks that attach identity minimally (never secrets), and route/edge protection at the layout** — the library handles the artifacts; you own the trust boundary.

---

## 1. Setup & Providers

- **One `auth` config; providers declared for the flows that exist:**

```ts
import NextAuth from "next-auth/next";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Credentials({ ... })],
  session: { strategy: "jwt" },
});
```

- **OAuth providers (+ scopes) minimal; Credentials only where a password flow truly exists (and rate-limited).**
- **Configuration centralized in one module; env/provider secrets via secrets store.**

---

## 2. Session Strategy

- **`jwt` strategy: stateless, edge-compatible, session data in a signed JWT; `database`: falls back to a DB session row:**

```ts
session: { strategy: "jwt", maxAge: 60 * 60 * 24 },
```

- **JWT = suitable for short-lived, role-light sessions; DB = durable roles/permissions/revocation.**
- **`session.strategy` decision documented; migration escapes cost change it.**

---

## 3. Callbacks

- **Callbacks are the translation layer — attach minimal identity:**

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) token.role = user.role;
    return token;
  },
  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
},
```

- **No sensitive material (tokens, emails for non-consenting contexts) in session.**
- **Token refreshing (`token.exp`) respected; `authorized` middleware for route-raising.**

---

## 4. Protection & Routing

- **Edge protection via `middleware`/`auth()` at the layout level:**

```ts
export { auth as middleware } from "@/auth";

export const config = { matcher: ["/app/:path*"] };
```

- **Route protection = guard at the boundary, not scattered `if (session)` in pages.**
- **API routes with `auth()` wrapper; roles checked where required.**

---

## 5. Database Sessions & Adapters

- **When DB sessions chosen, plug the adapter (Prisma/Drizzle):**

```ts
import { PrismaAdapter } from "@auth/prisma-adapter";
NextAuth({ adapter: PrismaAdapter(prisma), ... });
```

- **Session table schema via the adapter; cleanup expired sessions via scheduled task.**
- **Credentials + DB strategy vs OAuth + JWT: choose the trust model per app, don't mix carelessly.**

---

## 6. Security Hygiene

- **`AUTH_SECRET`/`secret` long, rotated; provider secrets never in client bundles.**
- **CSRF/`callbackUrl` handling sanctioned (NextAuth handles most — verify redirect sanity).**
- **Rate-limit the credential path; lockout on brute-force via stored throttling.**
- **Audit dependency upgrades (`@auth/*` versioning reviewed); logs redact PII.**

---

## General Rules of Thumb

- **One typed auth config; providers match real flows.**
- **Session strategy deliberate (JWT stateless vs DB durable).**
- **Callbacks attach minimal identity; middleware guards the tree.**
- **Adapters for DB sessions; cleanup scheduled.**
- **Secrets env-only; redirects safe; rate limits on forbids.**

---

## Quick-Start Checklist

- [ ] Auth config centralized; providers declared (OAuth/Credentials) minimal
- [ ] Session strategy chosen + documented (JWT vs DB + adapter)
- [ ] Callbacks minimal identity; no secrets in session
- [ ] Middleware route protection; API auth guards
- [ ] Adapter schema migrated; expired sessions cleaned
- [ ] `AUTH_SECRET` rotated; callbackUrl checked; rate limiting on credentials