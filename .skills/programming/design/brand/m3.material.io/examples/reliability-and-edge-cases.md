# Google Design System (Material Design 3): 4. Type Is Roles With Bundled Metrics

## Source guidance

This example applies the **4. Type Is Roles With Bundled Metrics** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Ship a _named_ scale — each role fixes size, line-height, weight, and tracking
together, so line breaks stay stable across components. Roles run
`display-*`, `headline-*`, `title-*`, `body-*`, `label-*`, each at
`small|medium|large`.
- **Use `body-medium` for product chrome**, not `body-large` — dense operational
UIs lose information density at `body-large`.
- **Monospace only for aligned numeric data** — prices, quantities, timestamps —

## Example

```css
@theme {
  --text-body-medium: 0.875rem;
  --text-body-medium--line-height: 1.45;
  --text-title-medium: 1rem;
  --text-title-medium--line-height: 1.4;
  --text-headline-medium: 1.5rem;
  --text-headline-medium--line-height: 1.3;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for google-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
