# Workflow notes

Focused reference for **yarn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
