# Materializecss: 1. Setup and Installation

## Source guidance

This example applies the **1. Setup and Installation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- CDN: include CSS + JS (choose the minified build from the official CDN).
- npm: `npm i materialize-css` (import CSS; add JS bundle manually).
- Sass: `@use "materialize-css/sass/materialize"` with variable overrides for theming.

## Example

```bash
npm i materialize-css
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for materializecss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
