# css: Basic Usage

CSS — Cascading Style Sheets for styling web documents with selectors, layout, responsive design, and performance.

## Scenario

Use this example as a starting point when applying **css** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Box Model and Units** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

.card {
  margin-inline: auto;
  padding-block: 1.5rem;
  max-inline-size: 40rem;
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
