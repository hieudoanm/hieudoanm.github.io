# stylex: Basic Usage

StyleX — compile-time CSS-in-JS from Meta (previously the internal Facebook system), generating atomic CSS with minimal runtime.

## Scenario

Use this example as a starting point when applying **stylex** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Setup and Integration** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
