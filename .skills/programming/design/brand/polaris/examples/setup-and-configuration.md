# Polaris Design System (Shopify): 7. Implementation

## Source guidance

This example applies the **7. Implementation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Web components** are the current Polaris line. Check the tag names in the
current docs rather than copying React examples.
- The React package (`@shopify/polaris`) is the legacy implementation; new work
should target the direction Polaris is actually shipping.
- Apps should centralize token overrides in a single file. Overrides scattered
across components are how a "Polaris" app stops looking like Polaris.
- Brand customization is meant to happen at the token layer, in one place.

## Example

```css
/* tokens.css — the only file allowed to override Polaris tokens */
:root {
  --p-color-bg-fill-brand: #4a4af4;
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for polaris-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
