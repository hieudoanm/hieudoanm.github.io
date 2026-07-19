# Playwright Best Practices: Basic Usage

Best practices for end-to-end testing with Playwright — the cross-browser testing framework conventions. Use when writing, structuring, or reviewing Playwright suites — covers locators, assertions, webServer, fixtures, network, and CI.

## Scenario

Use this example as a starting point when applying **playwright-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Assertions & Auto-Waiting** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
await Promise.all([
  page.waitForResponse(r => r.url().includes("/api/login") && r.ok()),
  page.getByRole("button", { name: "Sign in" }).click(),
]);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
