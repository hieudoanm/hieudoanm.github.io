# GitHub Packages Best Practices: 2. Package Setup

## Source guidance

This example applies the **2. Package Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Scoped names clean (`@myorg/lib`); `name`/`version`/`repository` consistent:**
- **`access: "restricted"` for private default; `"public"` only for intentional OS.**
- **`files` whitelist dist; `prepublishOnly` runs checks; headless installed packs.**

## Example

```json
{
  "name": "@myorg/analytics",
  "version": "1.2.3",
  "publishConfig": { "access": "restricted", "registry": "https://npm.pkg.github.com" },
  "files": ["dist/"]
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for github-packages-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
