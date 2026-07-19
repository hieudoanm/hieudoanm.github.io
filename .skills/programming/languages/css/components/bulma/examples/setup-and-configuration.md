# Bulma: 1. Installation and Setup

## Source guidance

This example applies the **1. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- CDN: include `bulma` CSS from CDN in HTML.
- npm: `npm i bulma` — import `bulma.min.css` in your JS/CSS entry.
- Load only what you need with the Sass modules (`bulma/sass/...`) if you build with Sass.

## Example

```bash
npm i bulma
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for bulma.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
