# emotion: Basic Usage

Emotion — CSS-in-JS library with tiny runtime, flexible styling APIs (css, styled, keyframes), and compatibility with React and vanilla JS.

## Scenario

Use this example as a starting point when applying **emotion** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup and Babel** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
