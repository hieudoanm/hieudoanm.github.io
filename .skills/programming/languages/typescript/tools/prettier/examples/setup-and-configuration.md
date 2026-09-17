# Prettier: 1. Configuration

## Source guidance

This example applies the **1. Configuration** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Use `prettier.config.mjs`** (or `.prettierrc.json`) at the repo root, committed. The `"prettier"` key in `package.json` works but hides the config in a busy file.
- **ESM config needs `.mjs`** unless your `package.json` has `"type": "module"` — a bare `prettier.config.js` with CommonJS `.js` will throw.
- **Pin the exact version** (`"prettier": "3.9.9"`, not `^3.9.9`). Prettier is explicit about this: formatter output changes between minors, and a floating range produces diffs nobody authored.

## Example

This excerpt is from the cited **1. Configuration** section.

```json
// .prettierrc.json
{
  "printWidth": 100,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "arrowParens": "always",
  "quoteProps": "as-needed",
  "objectWrap": "preserve",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for prettier-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
