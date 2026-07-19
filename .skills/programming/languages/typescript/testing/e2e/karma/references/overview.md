# Overview

Focused reference for **karma-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
