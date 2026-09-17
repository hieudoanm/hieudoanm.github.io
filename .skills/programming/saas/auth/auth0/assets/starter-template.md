# Auth0 Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Auth0 Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
// verify RS256 JWT locally, not over HTTP per request
const { payload } = jwt.verify(token, getSigningKey(jwks, header.kid), {
  audience: "https://api.example.com",
  issuer: "https://your-tenant.auth0.com/",
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
