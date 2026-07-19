# Yarn Best Practices: 1. Choosing Yarn & Version

## Source guidance

This example applies the **1. Choosing Yarn & Version** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Pin `packageManager` (corepack) + correspond `yarn.lock` format:**
- **Yarn Classic (`node_modules`, CSS-lock) vs Modern (PnP) — commit the choice in `.yarnrc.yml`:**
- **Never run both semantics in one repo — the config file governs; pin it in VCS.**

## Example

```bash
corepack enable
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for yarn-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
