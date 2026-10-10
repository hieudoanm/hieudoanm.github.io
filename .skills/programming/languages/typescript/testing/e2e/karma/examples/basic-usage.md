# Karma Best Practices: Basic Usage

Best practices for running browser tests with Karma — the test-runner conventions for Angular/Jasmine unit suites. Use when writing, structuring, or reviewing Karma — covers config, browsers, reporters, coverage, and CI.

## Scenario

Use this example as a starting point when applying **karma-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Configuration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
