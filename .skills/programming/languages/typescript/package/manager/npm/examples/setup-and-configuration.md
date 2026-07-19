# npm Best Practices: 2. Lockfiles & Determinism

## Source guidance

This example applies the **2. Lockfiles & Determinism** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Commit `package-lock.json` — the lockfile reproduces the graph:**
- **`npm ci` in CI (fails on lockfile mismatch — the true contract); `npm install` for dev evolution.**
- **`--save-exact` for the special few who need pinning; audit `npm ls` to diagnose dupes.**

## Example

```bash
npm ci          # CI/clean: installs exactly from lockfile
npm install     # updates graph + lockfile together; commit both
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for npm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
