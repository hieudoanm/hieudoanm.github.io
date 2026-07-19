# Vitest Best Practices: Starter Template

A reusable starting point derived from the **1. Config** section of [Vitest Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
