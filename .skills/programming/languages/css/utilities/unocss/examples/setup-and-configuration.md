# Unocss: 2. Installation and Setup

## Source guidance

This example applies the **2. Installation and Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Vite: `npm i -D unocss` + `import UnoCSS from 'unocss/vite'` → add plugin, then `import 'virtual:uno.css'`.
- Nuxt: use `@unocss/nuxt` module.
- Node/Vite-agnostic: use the tailwind-compatible `preset-wind` CLI / manual integrations.

## Example

```bash
npm i -D unocss
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for unocss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
