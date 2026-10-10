# Review checklist

Focused reference for **jsr-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 6. Hygiene & Security

- **Token least-privilege; never commit `.env`/tokens.**
- **`jsr publish` provenance-updated for hardening (`SAST` in CI).**
- **Deprecate versions deliberately; keep exports stable (semver discipline).**
- **Docs meta (readme/`deno task doc`) shipped with the package.**

---

## General Rules of Thumb

- **`deno.json`/`jsr.json` defines name/exports/version; source-first publish.**
- **Test cross-runtime (Deno/Node/browser) at the seams.**
- **CI-only publishing on tags; `--dry-run` first.**
- **`jsr:`/`npm:` specifiers resolved at install; lockfile integrity.**
- **Least-priv tokens; semver + stable exports.**

---

## Quick-Start Checklist

- [ ] `deno.json` with name/version/exports; publish.exclude set
- [ ] Source-only package; no dist artifact in the tarball
- [ ] Cross-runtime compatibility tested (feature-detects at seams)
- [ ] CI tag-driven publish with `JSR_TOKEN` secret; `--dry-run` gate
- [ ] Version/tag alignment; changelog per release
- [ ] Lockfiles cover JSR deps; tokens least-privilege
