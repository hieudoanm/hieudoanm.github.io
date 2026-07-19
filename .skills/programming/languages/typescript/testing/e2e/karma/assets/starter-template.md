# Karma Best Practices: Starter Template

A reusable starting point derived from the **1. Configuration** section of [Karma Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
