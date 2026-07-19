---
name: vitest-best-practices
description: Best practices for unit testing with Vitest — the Vite-native test runner conventions for the modern JS/TS ecosystem. Use when writing, structuring, or reviewing Vitest suites — covers config, matchers, mocking, coverage, watch mode, and CI.
---

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

## 2. Structure & Matchers

- **Jest-compatible `describe`/`it`/`expect` — same sentences, same optics:**

```ts
import { describe, it, expect } from "vitest";

describe("Cart", () => {
  it("sums item amounts", () => {
    expect(new Cart([{ amount: 2 }, { amount: 3 }]).total()).toEqual(5);
  });
});
```

- **Matchers mirror Jest** — `toEqual`/`toMatchObject` deep, `toThrow`, `toHaveBeenCalledWith`, `toContainEqual`.
- **`expect.any`, `expect.objectContaining` for partial/typed assertions.**

---

## 3. Mocking

- **`vi.fn`, `vi.mock`, `vi.spyOn` — boundary mocking at module seams:**

```ts
vi.mock("../api", () => ({ fetchUser: vi.fn(async () => userFixture) }));

it("falls back on failure", async () => {
  api.fetchUser.mockRejectedValueOnce(new Error("x"));
  await expect(loadUser(1)).rejects.toThrow(/x/);
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```

- **`mockResolvedValueOnce`/`mockRejectedValueOnce` for per-test scenarios; `vi.clearAllMocks()` in `beforeEach`.**
- **`vi.useFakeTimers()`/`advanceTimersByTime` for time logic — deterministic over sleeps.**
- **`vi.doMock`/`vi.dynamicImport` for module-level path-conditional fakes (rare).**

---

## 4. Watch & DX

- **`vitest` starts a watch-mode dev loop (HMR-like) — the default DX win; CI uses `vitest run`.**
- **Coverage via `--coverage` (`v8`/`istanbul` providers) with `coverage.thresholds`.**
- **`--project`/`--pool` options; `test.pool: "forks"`/`"threads"` tuned for heavy suites.**

---

## 5. DOM & Browser Mode

- **DOM: `environment: "jsdom"` (or happy-dom) + Testing Library examples with auto-cleanup.**
- **Browser-mode tests (`@vitest/browser`) run in a real browser — the happy middle between unit and E2E (real DOM, no WebDriver config).**
- **Standardize: node purity tests + jsdom component tests + vitest-browser/minimal integration tests.**
- **Async: `findBy`/`waitFor` (Testing Library) or `vi.waitFor`/`expect.poll` for settled assertion polling.**

---

## 6. CI & Repeatability

- **`vitest run` (no watch) in CI; `--coverage` gate as configured; shards (`--shard`) for parallel splitting.**
- **Filters deterministic; `--reporter verbose`/JUnit for readable CI output.**
- **Keep suites isolated (no shared DBs/ports); `--pool forks` where thread-polluting globals appear.**
- **No `.only`/`test.fails` leftovers — CI lint/verify the diff.**

---

## General Rules of Thumb

- **Vite-native config; env matched to target (node/jsdom/happy-dom/browser).**
- **Jest-style `expect`/`vi` — behavioral suites, boundary mocking.**
- **Fake timers over sleeps; `findBy`/`waitFor` for async settling.**
- **Watch-mode in dev, `vitest run` + coverage gate in CI.**
- **Browser mode for real-DOM coverage without WebDriver ceremony.**

---

## Quick-Start Checklist

- [ ] `vitest.config.ts` with `environment` + `coverage.thresholds`; aliases inherited from Vite
- [ ] `describe`/`it` sentences; `toEqual`/`toMatchObject`/`toThrow` matchers
- [ ] `vi.mock`/`vi.spyOn` at boundaries; `mockResolvedValueOnce` per test; mocks cleared
- [ ] `vi.useFakeTimers`/`advanceTimersByTime` for time logic
- [ ] `vitest run` + coverage gate in CI; shards for parallel
- [ ] Browser mode (or jsdom+TL) for DOM tests; no sleeps/`.only` shipped