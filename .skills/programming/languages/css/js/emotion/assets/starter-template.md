# Emotion: Starter Template

A reusable starting point derived from the **1. Setup and Babel** section of [Emotion](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```javascript
// babel.config.js — gives readable labels and stable class names in dev
export default {
  plugins: [
    [
      '@emotion/babel-plugin',
      { sourceMap: true, autoLabel: 'dev-only', labelFormat: '[local]' },
    ],
  ],
};
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
