# Overview

Focused reference for **github-packages-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# GitHub Packages Best Practices

GitHub Packages (GHR/ GHCR) hosts **private/registry-scoped npm packages alongside your GitHub org** — publishing via `GITHUB_TOKEN` or a PAT from a `workflow`, consumed through the scoped registry URL. Practical GitHub Packages leans on **a scoped name (`@org/pkg`), per-repo `workflow_dispatch`-style publish with least-privilege tokens, registry auth via `npm_config_registry` pattern, and version/changelog driven from tags** — the registry mirrors your Git state; automation owns the publish ceremony.

---

## 1. Auth & Registry

- **Per-scope config in `.npmrc` — never inline tokens:**

```ini
//npm.pkg.github.com/:_authToken=${NPM_AUTH_TOKEN}
@myorg:registry=https://npm.pkg.github.com
```

- **`GITHUB_TOKEN` at the org's rights granularity, or a scoped PAT with `read:packages`:**

```yaml
permissions:
  contents: read
  packages: write
```

- **Registry + actor must match: publishing `@myorg/x` → `npm.pkg.github.com` with org membership.**
