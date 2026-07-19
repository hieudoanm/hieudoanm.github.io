# TanStack Charts Best Practices: 1. The Data Model

## Source guidance

This example applies the **1. The Data Model** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Timeline data with causal keys; per-axis series mapped:**
- **Align data length/dimensions with axes; typed series data via generics.**
- **NaN/holes handled by the library's semantics — encode null as data, not absence.**

## Example

This excerpt is from the cited **1. The Data Model** section.

```js
const series = [{ label: "Revenue", data: [120, 130, 95] }];
const axes = [...];   // bottom x, left y
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tanstack-charts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
