---
name: jest-best-practices
description: Best practices for unit testing with Jest — the JavaScript testing framework conventions for the modern JS/TS ecosystem (including vitest-alike DX). Use when writing, structuring, or reviewing Jest suites — covers describe/it, matchers, mocking, fakes, coverage, and CI.
---

# Jest Best Practices

Jest is the **default test framework in the JS/TS ecosystem** — everything in one runner (runner, matchers, mocking, coverage, watch). Practical Jest leans on **behavioral suites (`describe`/`it` sentences), `toEqual`/`toMatchObject` deep matchers, and `jest.mock`/`jest.spyOn` for seam isolation** — with the config minimal (one `jest.config.js`/pkg `"jest"` block). Tests document and verify the contract.

---

## 1. Structure & Naming

- **`describe` per unit, nested `describe` per behavior, `it` one sentence:**

```ts
describe("Cart", () => {
  it("sums item amounts", () => {
    const cart = new Cart([{ amount: 2 }, { amount: 3 }]);
    expect(cart.total()).toEqual(5);
  });
});
```

- **One assertion-path per `it`; names read as mini-specs.**
- **Colocate `x.test.ts` beside `x.ts`** — discovery is convention-driven.

---

## 2. Matchers

- **`toEqual` deep; `toMatchObject` subset; `toBe` identity; `toStrictEqual` for stricter checks:**

```ts
expect(args).toMatchObject({ email: "a@b.c" });
expect(result).toEqual({ id: 1, name: "ada" });
```

- **`toHaveBeenCalledWith`, `toThrow`, `toHaveLength`, `toBeTruthy` — express intent.**
- **`expect.arrayContaining`/`objectContaining` for partial assertions.**

---

## 3. Mocking

- **`jest.mock("module")` for module fakes; `jest.spyOn(obj, "method")` at seams:**

```ts
jest.mock("../api", () => ({ fetchUser: jest.fn(async () => userFixture) }));

it("uses the fetched user", async () => {
  const res = await getUser(1);
  expect(res.email).toBe("ada@example.com");
  expect(api.fetchUser).toHaveBeenCalledWith(1);
});
```

- **`jest.fn()` with `mockResolvedValue`/`mockRejectedValue` for async seams; `mockReturnValue` for sync.**
- **Mock the boundary (`fetch`/DB/client), not the unit under test.**
- **`jest.clearAllMocks()`/`resetAllMocks` in `beforeEach`** — no state leaking between specs.

---

## 4. Fake Timers

- **`jest.useFakeTimers()` for time-dependent logic — deterministic:**

```ts
jest.useFakeTimers();

it("debounces", () => {
  change(); change();
  jest.advanceTimersByTime(300);
  expect(submit).toHaveBeenCalledTimes(1);
});
```

- **`jest.runAllTimers`/`advanceTimersByTime` exact; `useRealTimers()` after.**
- **Combine with `jest.spyOn(global, "setTimeout")` only when the seam requires it.**

---

## 5. Coverage

- **Coverage via `--coverage`/`collectCoverageFrom`; thresholds fail under gates:**

```ts
export default { collectCoverageFrom: ["src/**/*.{ts,tsx}"], coverageThreshold: {
  global: { lines: 80, statements: 80, branches: 75, functions: 80 } } };
```

- **Coverage is a signal for gaps, not a vanity number** — untested branches/edges found by reading the report route back to tests.
- **`--coverageReporters=["text","lcov"]` for local + CI artifacts.**

---

## 6. Config & CI

- **Config minimal:** `testEnvironment` (node/jsdom), `transform` for TS (ts-jest/babel), `setupFilesAfterEach` for globals.
- **`--runInBand`/shards for CI memory; `--ci` treats unexpected as failures; snapshots updated intentionally (`-u`) not blindly.**
- **`describe.only`/`it.only`/`test.only` are debug-only — keep the shipped suite green and unfocused.**

---

## General Rules of Thumb

- **Behavioral `describe`/`it`; one behavior per `it`.**
- **`toEqual`/`toMatchObject` deep; `toHaveBeenCalledWith` contracts.**
- **Mock the boundary; `beforeEach` clears mocks; fake timers deterministic.**
- **Coverage gate at meaningful thresholds; config minimal.**
- **CI: single-run, no focuses, snapshots intentional.**

---

## Quick-Start Checklist

- [ ] Colocated `x.test.ts`; nested `describe`; one-path `it`
- [ ] Matchers express intent (`toEqual`/`toMatchObject`/`toThrow`)
- [ ] `jest.mock`/`jest.spyOn` at boundaries; mocks cleared per test
- [ ] `useFakeTimers` for time logic; `useRealTimers` after
- [ ] Coverage thresholds enforced in CI config
- [ ] Config minimal; no `only` shipped; CI single-run