# 2. Setup and Integration

Focused reference for **stylex**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Setup and Integration

- Dependency: `@stylexjs/stylex`, `@stylexjs/babel-plugin`, `@stylexjs/webpack-plugin` (or Vite/Nuxt adapters).
- Configure the compiler entry (`importPath`, `genConditionalClasses`, `unstable_moduleResolution`).
- Recommended with React/Vite; also supports TypeScript types via `@stylexjs/stylex`.

```bash
npm i @stylexjs/stylex
npm i -D @stylexjs/babel-plugin @stylexjs/webpack-plugin
```

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
