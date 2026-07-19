# Uikit: 1. Installation and Setup

## Source guidance

This example applies the **1. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- CDN: `uikit` CSS/JS from CDN (unbundled builds for production).
- npm: `npm i uikit` — import `uikit/dist/css/uikit.css`, `uikit/dist/js/uikit.min.js` (+ `.uikit-icons.min.js` if using icons).
- Modular: `uikit/dist/js/uikit.js` and `uikit/dist/js/uikit-icons.js` allow selective `import { Icon } from 'uikit'`.

## Example

```bash
npm i uikit
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for uikit.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
