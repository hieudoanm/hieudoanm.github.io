# ZITADEL Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [ZITADEL Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
// local validation with ZITADEL's well-known JWKS
const { payload } = jwt.verify(token, jwks, {
  issuer: "https://your-instance.zitadel.cloud",
  audience: "your.com/business/project",
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
