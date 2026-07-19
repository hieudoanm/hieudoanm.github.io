# Daisyui: 1. Setup and Installation

## Source guidance

This example applies the **1. Setup and Installation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Requirements: Tailwind CSS v3/v4.
- Install: `npm i daisyui` then add `require('daisyui')` to `tailwind.config.js` `plugins` (or `@plugin "daisyui"` for v4).
- Import `daisyui/dist/full.css` (or use JIT via class detection when enabled).

## Example

```bash
npm i -D daisyui
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for daisyui.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
