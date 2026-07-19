# Clerk Best Practices: Basic Usage

Best practices for adding authentication to modern apps with Clerk. Use when wiring up sign-in/sign-up, sessions, organization support, or webhooks — covers session validation, frontend/backend patterns, and identity data.

## Scenario

Use this example as a starting point when applying **clerk** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Concepts** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
