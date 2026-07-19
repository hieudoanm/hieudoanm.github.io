# Overview

Focused reference for **better-auth-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
