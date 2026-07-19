# Better Auth Best Practices: Starter Template

A reusable starting point derived from the **1. Core Instance** section of [Better Auth Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  emailAndPassword: { enabled: true },
  socialProviders: { github: { clientId: env.GITHUB_ID, clientSecret: env.GITHUB_SECRET } },
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
