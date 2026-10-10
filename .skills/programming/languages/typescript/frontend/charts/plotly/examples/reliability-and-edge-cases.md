# Plotly.js Best Practices: 3. Performance for Large Data

## Source guidance

This example applies the **3. Performance for Large Data** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`type: "scattergl"` / `scatter3d`/WebGL renderers for 100k+ points:**
- **Down-sample/`fps` keep interactivity: `layout.dragmode/toggle` mindful of re-plotting.**
- **`frame`/animations only for genuinely animated dashboards; cap frames in updates.**

## Example

```js
const traces = [{ x, y, type: "scattergl", mode: "lines" }];
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for plotly-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
