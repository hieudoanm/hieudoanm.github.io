# Implementation notes

Focused reference for **vitest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
