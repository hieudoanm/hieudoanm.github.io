# Auth.js Best Practices: Basic Usage

Best practices for authentication in JS apps with Auth.js (NextAuth) — the auth conventions for React/Next framework apps. Use when writing, structuring, or reviewing Auth.js — covers providers, session/JWT strategy, callbacks, database sessions, and security hygiene.

## Scenario

Use this example as a starting point when applying **auth-js-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup & Providers** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import NextAuth from "next-auth/next";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Credentials({ ... })],
  session: { strategy: "jwt" },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
