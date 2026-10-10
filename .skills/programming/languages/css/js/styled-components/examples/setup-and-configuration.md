# Styled Components: 1. Setup

## Source guidance

This example applies the **1. Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Install: `npm i styled-components`.
- Babel: optional `babel-plugin-styled-components` for better debugging (component display names) and SSR.
- Micro-reify: `babel-preset-styled-components` improves bundle size in builds.

## Example

```bash
npm i styled-components
npm i -D babel-plugin-styled-components
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for styled-components.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
