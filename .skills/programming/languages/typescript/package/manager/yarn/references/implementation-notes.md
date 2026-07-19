# Implementation notes

Focused reference for **yarn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
