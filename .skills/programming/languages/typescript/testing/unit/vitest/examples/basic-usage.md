# Vitest Best Practices: Basic Usage

Best practices for unit testing with Vitest — the Vite-native test runner conventions for the modern JS/TS ecosystem. Use when writing, structuring, or reviewing Vitest suites — covers config, matchers, mocking, coverage, watch mode, and CI.

## Scenario

Use this example as a starting point when applying **vitest-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Config** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",          // or "jsdom"/"happy-dom" for DOM
    globals: true,
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: { thresholds: { lines: 80, statements: 80, branches: 75, functions: 80 } },
  },
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
