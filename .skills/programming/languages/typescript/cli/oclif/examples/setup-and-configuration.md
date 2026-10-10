# oclif CLI Design Best Practices: 1. Setup & Structure

## Source guidance

This example applies the **1. Setup & Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **One command per file in `src/commands/`**; directory nesting becomes topics (`src/commands/config/get.ts` → `app config get`).
- **Keep `main`/`bin` thin** — oclif wires the runner; business logic lives in the `Command` and services it calls.
- **`pjson.oclif` config** in `package.json` defines entry, topics, and hooks — treat it as part of the declaration surface.
- Version/help come from oclif automatically (`--version`, `--help`, topic-based help pages).

## Example

```bash
pnpm create oclif app        # or: pnpm add @oclif/core
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for oclif-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
