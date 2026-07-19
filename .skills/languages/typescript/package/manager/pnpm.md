---
name: pnpm-best-practices
description: Best practices for the pnpm package manager — strict, disk-efficient, and deterministic dependency conventions for JavaScript. Use when writing, structuring, or reviewing pnpm — covers install, store, workspaces, overrides, and CI.
---

# pnpm Best Practices

pnpm is **a strict, disk-efficient package manager** — content-addressed global store symlinked into projects, with **strict node_modules isolation** (no phantom deps). Practical pnpm leans on **a committed lockfile (`pnpm-lock.yaml`) with `frozenLockfile` in CI, a shared global store (`--store-dir`) for disk savings, workspaces for monorepos, and deliberate `overrides`/peer handling** — isolation is the safety feature: packages can't import what they didn't declare.

---

## 1. Install & Lockfile

- **Commit `pnpm-lock.yaml`; CI with frozen lockfile — reproducibility is the contract:**

```bash
pnpm install --frozen-lockfile     # CI: fail on drift
pnpm install                       # dev: evolve the lockfile
```

- **`pnpm add <pkg>` per install intent (never hand-edit deps).**
- **`--ignore-scripts` review for untrusted middleware; `pnpm approve-builds` where needed.**

---

## 2. Store & Disk

- **A single global store (`~/.pnpm-store` default) dedupes across projects:**

```bash
pnpm config set store-dir /opt/pnpm-store
pnpm store prune   # GC after long staleness
```

- **Symlinked `node_modules` — LFS-hostile? Know the deploy mode (`.pnpm` layout inside).**
- **Duplicate prevention is automatic; audit `pnpm install --fix-lockfile` if drift.**

---

## 3. Strictness & Phantom Deps

- **Strict node_modules means no undeclared imports — the compiler catches them:**

```text
// pnpm fails fast: a file importing "lodash" without declaring it
```

- **`allowBuilds`/`onlyBuiltDependencies` gates postinstall scripts (supply-chain control).**
- **Peer resolution strict: declare `peerDependencies` + `devDependencies` pairing in the package.</**

---

## 4. Workspaces

- **`packages/*` + `pnpm-workspace.yaml` for monorepos:**

```yaml
packages:
  - packages/*
  - services/*
```

- **Hoisted `node_modules`: no accidental global resolution; `pnpm -r --filter` commands target subsets.**
- **Consistent package manifests; `--workspace-concurrency` for parallel builds.**

---

## 5. Overrides & Struggles

- **`overrides` (pnpm) force resolutions — constrained, documented:**

```json
{ "pnpm": { "overrides": { "websocket": "^1.0.0" } } }
```

- **Avoid blanket overrides — pin with a reason; audit the subgraph (`pnpm why <pkg>`).**
- **`pnpm.lockfileVersion` pinned with the manager version — upgrade lockfiles deliberately.**

---

## 6. CI & Security

- **CI: `pnpm install --frozen-lockfile` + `pnpm audit --prod` gate:**

```bash
pnpm install --frozen-lockfile
pnpm audit --prod
```

- **Store cache across CI runners (content-addressable = cache-friendly).**
- **Flat "shameful-hoist" off by default (strict); least-privilege registry tokens.**

---

## General Rules of Thumb

- **Frozen lockfile in CI; commit `pnpm-lock.yaml`.**
- **Global store shared; `pnpm store prune` for GC.**
- **Strict node_modules catches undeclared deps at build time.**
- **Workspaces for monorepos; `--filter` targeting.**
- **Overrides constrained; audit gates enforce supply-chain health.**

---

## Quick-Start Checklist

- [ ] `pnpm-lock.yaml` committed; `--frozen-lockfile` in CI
- [ ] Global store configured; prune scheduled
- [ ] Strict node_modules enforced (no phantom deps imported)
- [ ] `pnpm-workspace.yaml` coherent; `pnpm -r --filter` used
- [ ] `overrides` few + documented; `pnpm why` for subgraph audit
- [ ] CI audit gate; store cached; tokens least-privilege