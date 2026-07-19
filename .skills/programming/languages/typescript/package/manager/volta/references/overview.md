# Overview

Focused reference for **volta-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Volta Best Practices

Volta is **a JS toolchain manager that pins Node, yarn/pnpm, and nvm-style runtime per-project — via `volta` "hooks" in `package.json`** — routing the right version from the toolchain section. Practical Volta leans on **`volta pin node@20 yarn@4` in the project (committed), `Volta installs` env-consistency across shells, and CI reuse `volta setup`/`volta run` for an engine-exact build** — the package.json `volta` block IS the contract; the lockfile adds the rest.

---

## 1. Pinning the Toolchain

- **Pin in the project — `volta pin` writes the `package.json` `volta` block:**

```json
{ "volta": { "node": "20.17.0", "yarn": "4.1.0" } }
```

- **`volta pin node@20` / `volta pin yarn@4` — the toolchain is versioned with the code.**
- **Volta auto-switches by directory as you `cd` — consistent `node`/`npm`/`yarn` on PATH.**
