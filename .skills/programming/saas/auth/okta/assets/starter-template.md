# Okta Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Concepts** section of [Okta Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
// groups-as-claims authorization
const { payload } = jwt.verify(token, jwks);
if (!payload.groups.includes("admins")) throw new ForbiddenError();
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
