# Overview

Focused reference for **yarn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Yarn Best Practices

Yarn is **a package manager focused on reliability and speed** — available as Yarn Classic (v1, `node_modules`) and Yarn Modern (v4+, with **Plug'n'Play / Zero-Install**). Practical Yarn leans on **sticking to ONE major version per repo (mixing v1/v4 configs breaks), committing the lockfile (`yarn.lock`), choosing `node_modules` vs PnP deliberately, and `yarn` classic-only flags gated in CI** — Pin the toolchain: `corepack` + a committed `.yarnrc.yml`.

---

## 1. Choosing Yarn & Version

- **Pin `packageManager` (corepack) + correspond `yarn.lock` format:**

```json
"packageManager": "yarn@4.1.0"
```

```bash
corepack enable
```

- **Yarn Classic (`node_modules`, CSS-lock) vs Modern (PnP) — commit the choice in `.yarnrc.yml`:**

```yaml
nodeLinker: pnp   # or "node-modules"
```
