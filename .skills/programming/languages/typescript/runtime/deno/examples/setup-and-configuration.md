# Deno Runtime Best Practices: 1. Secure by Default (Permissions)

## Source guidance

This example applies the **1. Secure by Default (Permissions)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **No implicit network, filesystem, or environment access** — the runtime starts sandboxed; grant only what the program needs:
- **`deno run --check`/`deno check`** type-checks as it runs — the compiler is part of execution, not a separate step.
- **Prompt as a fallback, not the default** — use `--allow-all`/`-A` only for trusted internal scripts, never for apps parsing external input.

## Example

```bash
deno run --allow-net=api.example.com src/main.ts    # allow network, scoped to one origin
deno run --allow-net --allow-read=./config src/main.ts
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for deno-runtime.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
