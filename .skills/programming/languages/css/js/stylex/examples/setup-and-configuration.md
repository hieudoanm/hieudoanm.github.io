# Stylex: 2. Setup and Integration

## Source guidance

This example applies the **2. Setup and Integration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Dependency: `@stylexjs/stylex`, `@stylexjs/babel-plugin`, `@stylexjs/webpack-plugin` (or Vite/Nuxt adapters).
- Configure the compiler entry (`importPath`, `genConditionalClasses`, `unstable_moduleResolution`).
- Recommended with React/Vite; also supports TypeScript types via `@stylexjs/stylex`.

## Example

```bash
npm i @stylexjs/stylex
npm i -D @stylexjs/babel-plugin @stylexjs/webpack-plugin
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for stylex.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
