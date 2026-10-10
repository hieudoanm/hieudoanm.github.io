# Overview

Focused reference for **pnpm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
