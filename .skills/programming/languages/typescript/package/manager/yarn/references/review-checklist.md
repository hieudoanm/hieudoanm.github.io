# Review checklist

Focused reference for **yarn-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
