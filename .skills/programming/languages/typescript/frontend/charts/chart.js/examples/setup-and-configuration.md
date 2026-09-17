# Chart.js Best Practices: 2. Datasets & Colors

## Source guidance

This example applies the **2. Datasets & Colors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Datasets self-describing: label, data, type (mixing), fill/color explicit:**
- **Palette consistent across charts (centralize colors); `fill` deliberate (area vs line).**
- **Na balances: legend labels set; `tooltip`/`interaction` configured for the dataset.**

## Example

```js
datasets: [
  { label: "Revenue", data: rev, borderColor: "#2563eb", fill: false },
  { label: "Costs",   data: cost, borderColor: "#dc2626", fill: true },
]
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for chart-js-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
