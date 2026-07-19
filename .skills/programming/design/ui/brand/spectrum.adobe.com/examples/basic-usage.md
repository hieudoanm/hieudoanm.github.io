# Spectrum Design System (Adobe): Basic Usage

Build Adobe creative-tool and productivity UI on the Spectrum design system. Covers the global/alias token split, Spectrum's canvas-plus-chrome density model, UI typography, theme and mode handling, the React Spectrum / Web Components / CSS-only implementations, tool-surface accessibility, and how to avoid forking the system. Use when building or reviewing creative editors, panels, toolbars, inspectors, or Adobe-adjacent enterprise UI.

## Scenario

Use this example as a starting point when applying **spectrum-design-system** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. The Two-Tier Token Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
/* application code consumes the alias, never the primitive */
.panel {
  background: var(--alias-background-color-primary);
  color: var(--alias-label-text-color);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
