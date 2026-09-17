# Stylex: Starter Template

A reusable starting point derived from the **2. Setup and Integration** section of [Stylex](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```javascript
// babel.config.js — without this the compiler never runs and styles break
export default {
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV !== 'production',
        importPath: 'node_modules/@stylexjs/stylex/lib/stylex.mjs',
        unstable_moduleResolution: { type: 'commonJS' },
      },
    ],
  ],
};
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
