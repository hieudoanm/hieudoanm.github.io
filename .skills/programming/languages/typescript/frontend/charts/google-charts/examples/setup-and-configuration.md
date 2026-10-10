# Google Charts Best Practices: 2. DataTable Semantics

## Source guidance

This example applies the **2. DataTable Semantics** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Typed columns over raw arrays:**
- **`addRole`/`{ role: "style" }` columns for per-point styling; `group`/`filter` for view transforms.**
- **Array-form via `new DataTable({cols, rows})` — but typed `addColumn` reads better.**

## Example

```js
const data = new google.visualization.DataTable();
data.addColumn("string", "Month");
data.addColumn("number", "Revenue");
data.addRows([["Jan", 120], ["Feb", 95]]);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for google-charts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
