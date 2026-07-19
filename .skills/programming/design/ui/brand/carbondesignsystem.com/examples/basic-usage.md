# Carbon Design System (IBM): Basic Usage

Build enterprise, data-dense web UI on IBM's Carbon design system instead of inventing tokens. Covers the four themes, the role-based token layer, productive vs editorial typography, layer-based elevation, the 2x Grid, Carbon package wiring for React and Web Components, accessibility, and where to declare divergence. Use when building or reviewing dashboards, admin consoles, tables, forms, settings, or any app that must sit inside IBM Cloud or a Carbon-flavoured surface.

## Scenario

Use this example as a starting point when applying **carbon-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Themes and the Token Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```scss
@use '@carbon/react' with (
  $background: #ffffff,
  $layer-01: #f4f4f4
);
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
