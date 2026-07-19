# Clerk Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Clerk Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
