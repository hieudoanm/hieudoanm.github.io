# Playwright Best Practices: Starter Template

A reusable starting point derived from the **2. Assertions & Auto-Waiting** section of [Playwright Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
await Promise.all([
  page.waitForResponse(r => r.url().includes("/api/login") && r.ok()),
  page.getByRole("button", { name: "Sign in" }).click(),
]);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
