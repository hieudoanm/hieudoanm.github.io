# Review checklist

Focused reference for **pnpm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
