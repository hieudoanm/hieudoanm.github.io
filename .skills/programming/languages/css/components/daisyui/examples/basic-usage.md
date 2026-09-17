# daisyui: Basic Usage

DaisyUI — Tailwind CSS component classes for rapid, accessible UI building with theming plugins and pure-class components.

## Scenario

Use this example as a starting point when applying **daisyui** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup and Installation** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```javascript
// tailwind.config.js (daisyUI v4 + Tailwind v3)
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
};
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
