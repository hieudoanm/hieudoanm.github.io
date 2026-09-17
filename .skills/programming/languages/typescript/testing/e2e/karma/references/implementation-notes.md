# Implementation notes

Focused reference for **karma-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Coverage Gate

- **`karma-coverage` + `check` thresholds fail the build under coverage:**

```js
coverageReporter: {
  type: "lcov",
  dir: "coverage/",
  check: { global: { statements: 80, branches: 75, functions: 80, lines: 80 } },
}
```

- **Coverage thresholds are the CI brake for untested seams** — raise the numbers as the suite matures.
- **`lcov` for the parseable artifact; `summary`/`text` for the quick read.**

---

## 5. Running & CI

- **`npm test` wraps `karma start` with the CI profile** (`singleRun` + headless) vs the dev loop (`--watch`).
- **CI runs on the headless launcher with the coverage gate**; failures surface the failing spec name, not a screenshot-less "1 failed".
- **`--reporters progress,spec`** for readable per-spec output.

---
