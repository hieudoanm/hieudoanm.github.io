---
name: karma-best-practices
description: Best practices for running browser tests with Karma — the test-runner conventions for Angular/Jasmine unit suites. Use when writing, structuring, or reviewing Karma — covers config, browsers, reporters, coverage, and CI.
---

# Karma Best Practices

Karma is a **test runner that executes unit tests in real browsers** — you write tests with Jasmine/Mocha, Karma launches Chrome/Firefox/headless, serves the bundle, and reports results. Practical Karma leans on **a minimal `karma.conf.js` (frameworks, browsers, bundling via webpack/vite/karma-esbuild), browser launchers matching CI (`ChromeHeadless`/custom launchers), and `karma-coverage` thresholds enforced as the CI gate.** Modern Angular CLIs bundle Karma by default; keep the config thin and purpose-driven.

---

## 1. Configuration

- **`karma.conf.js` is the wiring — frameworks + browsers + reporters:**

```js
module.exports = (config) => {
  config.set({
    frameworks: ["jasmine", "karma-typescript"],
    files: ["src/**/*.spec.ts"],
    preprocessors: { "src/**/*.spec.ts": ["karma-typescript"] },
    browsers: ["ChromeHeadless"],
    reporters: ["progress", "karma-coverage"],
    coverageReporter: { type: "lcov", dir: "coverage/" },
    singleRun: true,
  });
};
```

- **`singleRun: true` in CI; `singleRun: false` for the watch loop in dev.**
- **Custom launchers for CI flags** (e.g. `ChromeHeadlessNoSandbox` with `--no-sandbox` in Docker).
- **`browsers` runs the suite across browsers — headless Chrome (speed) + Firefox (coverage) in CI.**

---

## 2. Files & Bundling

- **Preprocess the TS/JS bundle** (karma-typescript, webpack, or esbuild) — the browser needs transpiled units, not bare TS.
- **`files`/`include` narrow to the test entry points**; no accidental serving of `node_modules`.
- **ESM consistency** — keep the module graph transpiled uniformly; mixing CJS/ESM breaks the browser run.

---

## 3. Browsers & Launchers

- **`ChromeHeadless` default; custom launcher for the CI environment:**

```js
customLaunchers: {
  ChromeHeadlessNoSandbox: {
    base: "ChromeHeadless",
    flags: ["--no-sandbox", "--disable-gpu"],
  },
}
```

- **Match launcher flags to the CI container** (sandbox, no-GPU, memory limits).
- **Timeouts set realistically** — `browserNoActivityTimeout`/`browserDisconnectTimeout`, not zero.

---

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

## General Rules of Thumb

- **Config minimal; frameworks/browsers/reporters — one task per concern.**
- **Real-browser runs test the browser environment — that's Karma's point.**
- **CI profile = `singleRun` + headless + coverage thresholds.**
- **Custom launchers tuned to the container; timeouts realistic.**
- **Coverage is a gate, not a vanity metric.**

---

## Quick-Start Checklist

- [ ] `karma.conf.js` with frameworks + browsers + reporters; `singleRun` in CI
- [ ] Bundle preprocessed (karma-typescript/webpack/esbuild); ESM consistent
- [ ] `ChromeHeadlessNoSandbox` in containers; launcher flags match CI
- [ ] `karma-coverage` with global thresholds as the CI gate
- [ ] `npm test` = CI profile; dev loop uses `--watch` + progress/spec reporters