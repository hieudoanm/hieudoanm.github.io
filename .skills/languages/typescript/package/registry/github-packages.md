---
name: github-packages-best-practices
description: Best practices for hosting and consuming JavaScript packages on GitHub Packages — the GHCR/GPR conventions for npm scope publishing. Use when writing, structuring, or reviewing GitHub Packages — covers auth, scoping, publishing, private packages, and CI workflows.
---

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

---

## 2. Package Setup

- **Scoped names clean (`@myorg/lib`); `name`/`version`/`repository` consistent:**

```json
{
  "name": "@myorg/analytics",
  "version": "1.2.3",
  "publishConfig": { "access": "restricted", "registry": "https://npm.pkg.github.com" },
  "files": ["dist/"]
}
```

- **`access: "restricted"` for private default; `"public"` only for intentional OS.**
- **`files` whitelist dist; `prepublishOnly` runs checks; headless installed packs.**

---

## 3. Publishing in CI

- **Publish workflow — dispatch or tag-driven, build + auth + publish:**

```yaml
name: publish
on:
  push:
    tags: [ "v*" ]
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { registry-url: "https://npm.pkg.github.com" }
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

- **Tag-driven versions keep registry + git aligned; CI is the only publisher.**

---

## 4. Consuming Private Packages

- **Consumer `.npmrc` points the scope at the registry; `npm ci` respects it:**

```ini
@myorg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

- **Paid/private read needs the appropriate token scoping; public packages resolve similarly.**
- **Pin with lockfile already covering the graph (auth read-only in CI builds).**

---

## 5. Versions & Semantics

- **Release tags → version ceremony (`npm version` + `git push --tags`); the `v*` pattern grounded.**
- **Deprecate/`npm unpublish` carefully — consumers hold the lock; communicate removals.**
- **Changelog per release from commits + labels (release-please/GitHub releases).**

---

## 6. Security & Hygiene

- **Least-privilege tokens; `packages: read` for consumers, `write` only for the publisher.**
- **Rotate tokens; never embed in `.npmrc`/code — env/secret only.**
- **Registry quota/admin monitored; delete/deprecate scripts documented.**

---

## General Rules of Thumb

- **Scoped `@org/name`; `.npmrc` centralized, tokens env/secret-only.**
- **Publish via CI only; tag-driven versions.**
- **`publishConfig` explicit; `files` whitelist; `prepublishOnly` check.**
- **Consumers get read-scoped tokens; lockfile governs resolution.**
- **Least-privilege everywhere; registry hygiene reflected in release notes.**

---

## Quick-Start Checklist

- [ ] `@myorg/pkg` + `publishConfig` registry/access set
- [ ] `.npmrc` scope → `npm.pkg.github.com`; tokens via env/secrets
- [ ] CI publish workflow with tag trigger + `packages: write`
- [ ] `GITHUB_TOKEN`/PAT scopes minimal (read/write split appropriately)
- [ ] `npm ci` + build + publish gated; `files` whitelist present
- [ ] Version bump via git tags; release notes per version