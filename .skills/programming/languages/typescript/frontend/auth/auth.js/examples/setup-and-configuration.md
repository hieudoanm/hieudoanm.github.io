# Auth.js Best Practices: 1. Setup & Providers

## Source guidance

This example applies the **1. Setup & Providers** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One `auth` config; providers declared for the flows that exist:**
- **OAuth providers (+ scopes) minimal; Credentials only where a password flow truly exists (and rate-limited).**
- **Configuration centralized in one module; env/provider secrets via secrets store.**

## Example

This excerpt is from the cited **1. Setup & Providers** section.

```ts
import NextAuth from "next-auth/next";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub, Credentials({ ... })],
  session: { strategy: "jwt" },
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for auth-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
