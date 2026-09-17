# Dodo Payments Best Practices: Starter Template

A reusable starting point derived from the **3. Webhooks & Entitlement** section of [Dodo Payments Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
const mac = crypto.createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
if (mac !== signature) return res.status(401).end();
// dedup → handle event → grant/revoke entitlement
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
