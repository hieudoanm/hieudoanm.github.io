# Review checklist

Focused reference for **github-packages-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Security & Hygiene

- **Least-privilege tokens; `packages: read` for consumers, `write` only for the publisher.**
- **Rotate tokens; never embed in `.npmrc`/code — env/secret only.**
- **Registry quota/admin monitored; delete/deprecate scripts documented.**

---

## General Rules of Thumb

- **Scoped `@org/name`; `.npmrc` centralized, tokens env/secret-only.**
- **Publish via CI only; tag-driven versions.**
- **`publishConfig` explicit; `files` whitelist; `prepublishOnly` check.**
- **Consumers get read-scoped tokens; lockfile governs resolution.**
- **Least-privilege everywhere; registry hygiene reflected in release notes.**

---

## Quick-Start Checklist

- [ ] `@myorg/pkg` + `publishConfig` registry/access set
- [ ] `.npmrc` scope → `npm.pkg.github.com`; tokens via env/secrets
- [ ] CI publish workflow with tag trigger + `packages: write`
- [ ] `GITHUB_TOKEN`/PAT scopes minimal (read/write split appropriately)
- [ ] `npm ci` + build + publish gated; `files` whitelist present
- [ ] Version bump via git tags; release notes per version
