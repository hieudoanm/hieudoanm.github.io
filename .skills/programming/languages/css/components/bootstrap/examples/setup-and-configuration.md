# Bootstrap: 1. Installation and Setup

## Source guidance

This example applies the **1. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- CDN (quick start): `<link>` CSS + `<script>` bundle for components needing JS.
- npm: `npm i bootstrap` — import `bootstrap/dist/css/bootstrap.min.css` and the JS bundle.
- Sass theming: import `bootstrap/scss/_functions.scss`, `_variables.scss`, then override variables before importing the rest.
- For React: use `react-bootstrap` components; for Angular, `ng-bootstrap`.

## Example

```bash
npm i bootstrap
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for bootstrap.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
