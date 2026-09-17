# Plotly.js Best Practices: 4. Config & Interactivity

## Source guidance

This example applies the **4. Config & Interactivity** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **The `config` object gates UI chrome:**
- **`scrollZoom`/`dragmode`/`hovermode` per purpose; toImage scale for exports.**
- **`Plotly.Plots.resize` on container changes; `react` re-lays responsively.**

## Example

```js
const config = { displaylogo: false, responsive: true, modeBarButtonsToRemove: ["lasso2d"] };
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for plotly-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
