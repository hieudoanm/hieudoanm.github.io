# Emotion: 1. Setup and Babel

## Source guidance

This example applies the **1. Setup and Babel** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- React: `npm i @emotion/react @emotion/styled`.
- Zero-config works with Vite/webpack (`@emotion/babel-plugin` optional for previews and details).
- For SSR, configure an Emotion server instance (`createCache`, `@emotion/server`).

## Example

```bash
npm i @emotion/react @emotion/styled
npm i -D @emotion/babel-plugin
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for emotion.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
