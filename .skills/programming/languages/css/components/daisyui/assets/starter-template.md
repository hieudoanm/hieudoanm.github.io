# Daisyui: Starter Template

A reusable starting point derived from the **1. Setup and Installation** section of [Daisyui](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
