# D3 Best Practices: 4. SVG Structure

## Source guidance

This example applies the **4. SVG Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Groups (`<g>`) per layer: margins created once:**
- **Plot layers separated (grid, axes, series, labels) for reuse; geometric elements typed (path/circle/line/rect).**
- **Defs (`<defs>`) for gradients/patterns; foreign domains stay SVG-only unless defs need HTML.**

## Example

```js
const plot = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for d3-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
