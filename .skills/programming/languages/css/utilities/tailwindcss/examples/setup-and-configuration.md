# Tailwindcss: 1. Installation and Setup (v3)

## Source guidance

This example applies the **1. Installation and Setup (v3)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Install: `npm i -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`.
- Configure `content` globs in `tailwind.config.js` to watch your source files for class extraction.
- Add `@tailwind base; @tailwind components; @tailwind utilities;` to your CSS entry.
- PostCSS plugin ties it into the build (`postcss.config.js → tailwindcss + autoprefixer`).

## Example

```bash
npm i -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tailwindcss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
