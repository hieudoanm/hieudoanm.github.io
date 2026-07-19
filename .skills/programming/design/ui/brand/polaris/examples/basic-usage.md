# Polaris Design System (Shopify): Basic Usage

Build commerce and merchant-facing web UI on Shopify's Polaris design system. Covers the --p-* token namespace, 4px spacing, role-based color (bg, text, fill, border, icon), depth restraint, the current web-components direction versus the legacy React package, per-surface context (Admin, Checkout, POS, customer accounts), accessibility, and brand customization. Use when building or reviewing admin tooling, merchant dashboards, checkout surfaces, or any Shopify app UI.

## Scenario

Use this example as a starting point when applying **polaris-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Color Is a Role System** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
.page {
  background: var(--p-color-bg);
  color: var(--p-color-text);
}

.page__section {
  background: var(--p-color-bg-surface-secondary);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
