---
name: better-auth-best-practices
description: Best practices for authentication with Better Auth — the TypeScript-first auth library conventions for modern web apps. Use when writing, structuring, or reviewing Better Auth — covers plugins, database adapters, sessions, middleware, and security.
---

# Better Auth Best Practices

Better Auth is a **TypeScript-first, framework-agnostic auth library for modern web apps** (works with Next.js, SvelteKit, Hono, etc.) — **plugin ecosystem (`emailPassword`, `socialProviders`), database adapters, and a single typed `betterAuth()` server instance.** Practical Better Auth leans on **one typed auth instance per app with plugins declared for the real flows, a chosen database adapter with connected schema, sessions managed via cookies, and the instance shared across router/sub-routes** — the API surface is typed at the framework seam, not scattered string handlers.

---

## 1. Core Instance

- **One `betterAuth()` server config; types exported for the client:**

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET } },
});
```

- **Plugins on/off per flow: `emailAndPassword.enabled`, `socialProviders`, `twoFactor`, `admin`.**
- **Config in one module; secrets from env only.**

---

## 2. Database & Adapters

- **Setup the adapter + schema (Prisma/Drizzle/Kysely):**

```ts
import { prismaAdapter } from "better-auth/adapters/prisma";
database: prismaAdapter(prisma, { provider: "postgresql" })
```

- **Run schema migrations (`better-auth` will surface the generated schema); sessions/users/tokens tables versioned.**
- **Conditional adapters documented by engine (sqlite/postgres) — behavior parity checked.**

---

## 3. Sessions & Cookies

- **Sessions via signed cookies by default; options tuned:**

```ts
session: {
  cookieCache: { enabled: true },   // edge-friendly caching
  expiresIn: 60 * 60 * 24 * 7,
}
```

- **Cookie attributes secure/HttpOnly honored by the framework's default handler.**
- **Session revocation on logout/password change; expiry/refresh fit the app's trust posture.**

---

## 4. Routing & Middleware

- **Wire the route handler in the server entry (framework binds it):**

```ts
// Next.js app route
import { auth } from "@/auth";
export { GET, POST } from "better-auth/api-handler";  // framework-adapted
```

- **Guard pages via the framework middleware/loader calling `auth.api.getSession()`.**
- **Roles/permissions via `auth.api` scoped IP — checked at the boundary.**

---

## 5. Client Integration

- **Client hooks (`createAuthClient`) typed against the server instance:**

```ts
import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient();
// await authClient.signUp.email(...), signIn, signOut
```

- **Morgan pattern: `authClient.use` middleware for auth UI states; SSR fetch with cookie forwarding.**
- **No provider-leaked secrets; client payloads stay minimal.**

---

## 6. Security & Operations

- **Rate-limit auth endpoints; CSRF-safe cookie flows (library default) verified for the framework.**
- **Secrets rotated; `AUTH_SECRET`/`BETTER_AUTH_SECRET` not committed.**
- **Lighthouse: multi-tenant/SSRF-sensitive flows — trust boundaries documented.**
- **Tests: integration against the pinned version; CI key rotation drill.**

---

## General Rules of Thumb

- **One typed instance; plugins reflect real flows.**
- **Adapter + schema migrated; parity across engines documented.**
- **Sessions via cookies; middleware guards at the boundary.**
- **Client typed (`createAuthClient`); SSR cookie forwarding correct.**
- **Rate limits + secret hygiene + CSRF verified.**

---

## Quick-Start Checklist

- [ ] Central `betterAuth()` instance; plugins minimal; secrets env-only
- [ ] Adapter schema applied; data migrations committed
- [ ] Cookie/session options deliberate; revocation on logout
- [ ] Route handler wired; framework middleware guards pages
- [ ] `createAuthClient` typed; SSR cookie forwarding checked
- [ ] Rate limits on auth; secret rotation; CI integration tests