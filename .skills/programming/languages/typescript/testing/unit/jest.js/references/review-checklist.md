# Review checklist

Focused reference for **jest-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
