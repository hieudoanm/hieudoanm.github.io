---
name: volta-best-practices
description: Best practices for managing Node toolchains with Volta — the per-project Node/yarn/pnpm launcher conventions. Use when writing, structuring, or reviewing Volta setups — covers hooks, tool pinning, environments, and CI.
---

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

---

## 2. Setup & Environment

- **Install via curl script or `curl` — then `volta install node` fetches the toolchain:**
- **`volta setup` configures the shim (`~/.volta`) — shells pick the right version automatically.**
- **`volta list`/`volta uninstall` for audit — the shim is lean; versions fetched on demand.**

---

## 3. Per-Project Consistency

- **Every command runs with the pinned toolchain — including `npm ci`/`yarn install`:**
- **Lockfiles + Volta block double-ensure: pinning is declarative, lockfiles pin the graph.**
- **Multiple versions coexist; `volta pin` is the single source — avoid dual nvm+volta in one ergonomic.**

---

## 4. CI Integration

- **CI: install Volta, run via the pinned hook:**

```bash
curl https://get.volta.sh | bash      # then PATH
volta install node@20
volta run --node=20 yarn ci
```

- **Or honor the block directly: `volta run node --version` proves the engine.**
- **Cache `.volta` in CI (bolt off the network); pinned versions cached by hashes.**

---

## 5. Compat & Troubleshooting

- **Ensure the `volta` block and `engines` don't disagree — `engines` is a check, `volta` is the enforcer.**
- **Proxy/corporate registries: `VOLTA_FEATURE_PNPM` etc. as needed; mirrors for offline.**
- **Migrate from nvm/system-managed: uninstall old, `volta pin` then `volta install`.**

---

## General Rules of Thumb

- **`volta pin node/yarn/pnpm` per project — the block is the contract.**
- **Setup once; auto-switch via shim; versions on demand.**
- **CI: `volta` in the image + cached `.volta`; engine exact.**
- **`engines` + `volta` block kept in sync.**
- **No dual managers; one source of truth per repo.**

---

## Quick-Start Checklist

- [ ] `volta` block in `package.json` committed (pinned node+yarn)
- [ ] `volta setup` on dev machines; auto-switch verified via `node --version`
- [ ] CI installs Volta + runs pinned toolchain; `.volta` cached
- [ ] `engines` matches the block; no conflicting managers
- [ ] Corporate mirrors/offline handled (`VOLTA_FEATURE_*` config)
- [ ] Toolchain pinned versions audited via `volta list`