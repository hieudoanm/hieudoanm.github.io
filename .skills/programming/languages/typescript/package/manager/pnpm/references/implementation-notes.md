# Implementation notes

Focused reference for **pnpm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
