# pnpm Best Practices: 1. Install & Lockfile

## Source guidance

This example applies the **1. Install & Lockfile** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Commit `pnpm-lock.yaml`; CI with frozen lockfile — reproducibility is the contract:**
- **`pnpm add <pkg>` per install intent (never hand-edit deps).**
- **`--ignore-scripts` review for untrusted middleware; `pnpm approve-builds` where needed.**

## Example

```bash
pnpm install --frozen-lockfile     # CI: fail on drift
pnpm install                       # dev: evolve the lockfile
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for pnpm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
