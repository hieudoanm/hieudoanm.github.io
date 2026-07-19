# Review checklist

Focused reference for **volta-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## General Rules of Thumb

- **`volta pin node/yarn/pnpm` per project — the block is the contract.**
- **Setup once; auto-switch via shim; versions on demand.**
- **CI: `volta` in the image + cached `.volta`; engine exact.**
- **`engines` + `volta` block kept in sync.**
- **No dual managers; one source of truth per repo.**

---

## Quick-Start Checklist

- [ ] `volta` block in `package.json` committed (pinned node+yarn)
- [ ] `volta setup` on dev machines; auto-switch verified via `node --version`
- [ ] CI installs Volta + runs pinned toolchain; `.volta` cached
- [ ] `engines` matches the block; no conflicting managers
- [ ] Corporate mirrors/offline handled (`VOLTA_FEATURE_*` config)
- [ ] Toolchain pinned versions audited via `volta list`
