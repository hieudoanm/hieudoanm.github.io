# Lemon Squeezy Best Practices: Starter Template

A reusable starting point derived from the **3. Webhooks & Entitlement** section of [Lemon Squeezy Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
const sig = req.headers["x-signature"];
const digest = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (sig !== digest) return res.status(401).end();
// event.data → dedup → entitlement updates
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
