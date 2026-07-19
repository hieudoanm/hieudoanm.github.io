# Workflow notes

Focused reference for **volta-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
