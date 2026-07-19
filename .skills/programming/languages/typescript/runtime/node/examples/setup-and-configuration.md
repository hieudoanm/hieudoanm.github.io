# Node.js Runtime Best Practices: 1. Module System (ESM by Default)

## Source guidance

This example applies the **1. Module System (ESM by Default)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **ESM everywhere** — `"type": "module"` in `package.json`, `import` over `require`; no CJS interop friction for new code.
- **Use `node:` prefix** for built-ins so they're unambiguous and not shadowable: `import { readFile } from "node:fs/promises"`.
- **TypeScript runs first-class** — Node 22.6+ (type stripping) and 23.6+/24 (enabled by default) execute `.ts` directly; keep `--experimental-transform-types`/`erasableSyntaxOnly` in mind and keep types erasable (no enums/namespaces in hot paths if runtime-TS).
- **`import.meta.url` / `import.meta.dirname`** replace `__dirname` for file-path resolution in ESM:

## Example

```ts
import { fileURLToPath } from 'node:url';
const cwd = import.meta.dirname;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for nodejs-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
