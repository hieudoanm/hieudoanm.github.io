# Overview

Focused reference for **auth-js-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
