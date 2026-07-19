# Overview

Focused reference for **vitest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Vitest Best Practices

Vitest is the **Vite-native test runner** — near-zero-config for Vite projects, ESM-first, fast watch mode, Jest-compatible API combined with Vite's HMR and aliases. Practical Vitest leans on **`expect` matchers + `vi` mocks (Jest-style), config that leans on Vite `resolve.alias`, and `test.environment` matched to the target (node vs jsdom/happy-dom)** — with the same behavioral discipline: describe/it sentences, boundary mocking, no sleep-based waits. Browser tests (`vitest` browser mode) fill the E2E gap where DOM behavior matters.

---

## 1. Config

- **Lean on Vite config; `vitest.config.ts` overrides for the test env:**

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

- **`environment` matches the target** — node for pure logic, jsdom/happy-dom for DOM, `environmentMatchGlobs` per path.
- **`resolve.alias` from Vite applies — no separate module dance for `@/` imports.**

---
