# Review checklist

Focused reference for **mocha-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **CI single-run + `--reporter mocha-junit-reporter` (or `@cypress/xvfb` contexts); coverage via `c8`/`nyc` at the runner level.**
- **Parallelize with `mocha --parallel` when suites are isolated (shared DBs/ports are anti-patterns).**
- **`--grep` for debug filtering; `.only` is debug-only — never committed.**

---

## General Rules of Thumb

- **`describe`/`it` structure + hooks; one behavior per `it`.**
- **One assertion style (Chai `expect`), `eql` for deep equality.**
- **Async explicit (async/await or `done` on every path); realistic `timeout`.**
- **Sinon stubs at boundaries; `sinon.restore()` per test.**
- **Runner config minimal; CI single-run + coverage gate; no `.only` shipped.**

---

## Quick-Start Checklist

- [ ] Nested `describe`; `beforeEach` fresh state; `afterEach` cleanup
- [ ] Standardized assertion style (Chai `expect`); `eql` for objects
- [ ] Async tested explicitly with timeouts; `done` on all paths
- [ ] Sinon stubs/spies at seams; restore in teardown
- [ ] Runner config (spec/reporter/timeout); CI single-run + coverage
- [ ] No focused `.only` committed; parallel only for isolated suites
