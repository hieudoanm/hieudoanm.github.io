# Review checklist

Focused reference for **vitest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
