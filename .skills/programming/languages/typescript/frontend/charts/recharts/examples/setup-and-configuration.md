# Recharts Best Practices: 3. Tooltip & Accessibility

## Source guidance

This example applies the **3. Tooltip & Accessibility** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Custom `Tooltip` content component with typed props; default minimal:**
- **`accessibilityLayer` where charts must be screen-reader friendly — title/desc set.**
- **`Legend` explicit `formatter`/`iconSize`; hide when the graph self-explains.**

## Example

```jsx
<Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for recharts-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
