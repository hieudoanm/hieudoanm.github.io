---
name: yarn-best-practices
description: Best practices for the Yarn package manager (Yarn classic and modern Yarn 4+ PnP) — dependency conventions for JavaScript. Use when writing, structuring, or reviewing Yarn projects — covers install modes, lockfiles, PnP/silent, workspaces, and CI.
---

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

- **Never run both semantics in one repo — the config file governs; pin it in VCS.**

---

## 2. Lockfiles & Install

- **Commit `yarn.lock`; `yarn install` updates graph + lock together; `--immutable` in CI:**

```bash
yarn install --immutable    # fail on drift (like frozen)
yarn install --check-cache  # verify integrity in CI
```

- **Append-only lock discipline: why-answers to the frozen build are in the diff, not the drift.**

---

## 3. PnP vs node_modules

- **PnP: zero `node_modules` — the dependency graph resolved from `.pnp.cjs`; fast, strict:**
- **Strictness catches undeclared dependencies (same benefit as pnpm).**
- **Tooling compatibility: some tools expect on-disk `node_modules` — test CI before flipping.**
- **Classic flow: `nodeLinker: node-modules` matches legacy expectations.**

---

## 4. Workspaces & Monorepos

- **`workspaces:` in package.json (Modern-compatible) — one lock, dedupe:**

```json
{ "workspaces": ["packages/*"] }
```

- **`yarn workspaces foreach --parallel run build` for orchestration; consistent manifests.**
- **Cross-package imports resolve within the workspace graph (PnP-aware).**

---

## 5. Scripts & Lifecycle

- **`yarn run` for conventional commands; `yarn` alone = install (v1 ergonomics).**
- **Lifecycle ceremonies consistent (`prepublishOnly` runs checks).**
- **`yarn dlx` for one-off tools (pinned) — the modern `npx` moment-flag.**

---

## 6. Security & CI

- **`yarn audit` wired into CI (fail on high); `yarn outdated` quarterly.**
- **`--cascade` store/cache in CI (`.yarn/cache` committed for PnP zero-install); auth tokens env-scoped, none inline.**
- **`yarn constraints` for package.json lint (Modern) — catches drift declaratively.**

---

## General Rules of Thumb

- **One Yarn major per repo; corepack-pinned.**
- **Lockfile committed; `--immutable`/`--check-cache` in CI.**
- **PnP vs node_modules decided deliberately; tested in CI.**
- **Workspaces for monorepos; `foreach` orchestration.**
- **Audit gates + constraints linting; tokens env-only.**

---

## Quick-Start Checklist

- [ ] `packageManager` pinned via corepack; `.yarnrc.yml` committed
- [ ] `yarn.lock` committed; `--immutable` in CI
- [ ] PnP/classic choice documented; tooling verified on that mode
- [ ] Workspaces layout; `yarn workspaces foreach` targeting
- [ ] `dlx` for one-off tools; `prepublishOnly` runs checks
- [ ] CI audit gate; `.yarn/cache` strategy; constraints lint active