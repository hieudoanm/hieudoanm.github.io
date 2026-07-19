# Highcharts Best Practices: 2. Configuration & Series

## Source guidance

This example applies the **2. Configuration & Series** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Series/axes/legend/tooltip each configurable; options are documentation:**
- **`plotOptions` for shared series defaults; per-series overrides on top.**
- **Na-specific: `null`/gaps handled via `connectNulls`; stacking `stack: "x"` explicit.**

## Example

```js
{
  tooltip: { shared: true },
  legend: { enabled: true },
  plotOptions: { line: { marker: { enabled: false } } },
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for highcharts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
