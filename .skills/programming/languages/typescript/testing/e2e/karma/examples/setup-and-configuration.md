# Karma Best Practices: 1. Configuration

## Source guidance

This example applies the **1. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`karma.conf.js` is the wiring — frameworks + browsers + reporters:**
- **`singleRun: true` in CI; `singleRun: false` for the watch loop in dev.**
- **Custom launchers for CI flags** (e.g. `ChromeHeadlessNoSandbox` with `--no-sandbox` in Docker).
- **`browsers` runs the suite across browsers — headless Chrome (speed) + Firefox (coverage) in CI.**

## Example

This excerpt is from the cited **1. Configuration** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for karma-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
