# Karma Best Practices: 4. Coverage Gate

## Source guidance

This example applies the **4. Coverage Gate** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`karma-coverage` + `check` thresholds fail the build under coverage:**
- **Coverage thresholds are the CI brake for untested seams** — raise the numbers as the suite matures.
- **`lcov` for the parseable artifact; `summary`/`text` for the quick read.**

## Example

```js
coverageReporter: {
  type: "lcov",
  dir: "coverage/",
  check: { global: { statements: 80, branches: 75, functions: 80, lines: 80 } },
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for karma-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
