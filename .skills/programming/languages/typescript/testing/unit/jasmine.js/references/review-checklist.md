# Review checklist

Focused reference for **jasmine-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Running & CI

- **`jasmine` runner (`npx jasmine jasmine.json` / `karma-jasmine` in browsers) — spec patterns explicit.**
- **CI: headless + single run; coverage via `karma-coverage`/`nyc` when wired.**
- **`fit`/`fdescribe` are debug-only — remove focused specs before commit (CI catches them with a filter).**

---

## General Rules of Thumb

- **`describe`/`it` sentences; one assertion-path per `it`.**
- **`toEqual` deep, `toBe` identity; `toThrowError` documented contracts.**
- **`spyOn` at seams; `beforeEach` fresh state; `afterEach` restore.**
- **Async with async/await; `expectAsync`; explicit done for callbacks.**
- **Run headless in CI; no `fit`/`fdescribe` shipped.**

---

## Quick-Start Checklist

- [ ] Nested `describe` per behavior; one-path `it` names
- [ ] Correct matchers (`toEqual`/`toBe`/`toThrowError`)
- [ ] `spyOn` seams; controlled returns/errors
- [ ] Fresh state in `beforeEach`; restores in `afterEach`
- [ ] Async specs via async/await or explicit `done`
- [ ] CI headless + single run; focused specs removed
