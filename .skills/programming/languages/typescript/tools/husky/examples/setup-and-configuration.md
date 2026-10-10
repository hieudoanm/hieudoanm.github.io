# Husky: 2. Setup

## Source guidance

This example applies the **2. Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Husky 9 removed `husky install` and the `husky init` boilerplate.** If you find `. "$(dirname -- "$0")/_/husky.sh"` in a hook, that file is pre-v9. The `_` directory was removed because it was the source of most Husky setup bugs.
- **`husky init` is optional — hand-creating the directory works.** Husky 9 needs only the folder and the `prepare` script.
- **Add `"prepare": "husky"` to `package.json`.** This is what re-points `core.hooksPath` after every `npm install` or `git clone`. Omit it and hooks silently stop working for everyone but you.

## Example

```bash
npx husky init
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for husky-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
