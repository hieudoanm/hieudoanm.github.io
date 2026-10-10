# Better Auth Best Practices: Basic Usage

Best practices for authentication with Better Auth — the TypeScript-first auth library conventions for modern web apps. Use when writing, structuring, or reviewing Better Auth — covers plugins, database adapters, sessions, middleware, and security.

## Scenario

Use this example as a starting point when applying **better-auth-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Instance** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET } },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
