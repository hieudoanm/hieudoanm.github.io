# Sass: 1. Installation and Setup

## Source guidance

This example applies the **1. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Modern setup: `npm install -D sass` (Dart Sass). Legacy: Ruby Sass (deprecated).
- Cli: `sass input.scss output.css`; watch mode: `sass --watch`.
- Bundlers: Vite (`vite-plugin-sass`), Webpack (`sass-loader`), and Node API via the `sass` package.

## Example

```bash
npm install -D sass
npx sass src/styles/index.scss public/styles.css --watch
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for sass.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
