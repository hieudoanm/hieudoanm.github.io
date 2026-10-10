# Workflow notes

Focused reference for **pnpm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
