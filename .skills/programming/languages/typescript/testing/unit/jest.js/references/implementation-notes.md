# Implementation notes

Focused reference for **jest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
