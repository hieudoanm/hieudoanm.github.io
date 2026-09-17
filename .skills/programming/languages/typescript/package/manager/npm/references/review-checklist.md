# Review checklist

Focused reference for **npm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```bash
npm audit --production   # only what ships
npm outdated
```

- **Trust the provenance: prefer scoped/official packages; avoid tall dependency trees that drift; `overrides` only with a reason documented.**
- **Registry mirrors (Verdaccio/proxy) for orgs; SSRF feel. Least-privilege tokens.**

---

## General Rules of Thumb

- **Minimal precise deps; lockfile committed + `npm ci` in CI.**
- **`engines` pinned; type explicit; structure honest.**
- **Scripts as the interface; workspaces for monorepos.**
- **Publish clean artifacts; `prepublishOnly` gates.**
- **CI audit gate; scoped/official packages preferred.**

---

## Quick-Start Checklist

- [ ] package.json minimal: `engines`, `type`, honest deps vs dev
- [ ] `package-lock.json` committed; `npm ci` in CI
- [ ] `npm run` scripts standard (build/test/lint/typecheck)
- [ ] Workspaces layout coherent; per-package dependency honesty
- [ ] `files` whitelist + `prepublishOnly` set before publish
- [ ] CI `npm audit` gate; scoped versions pinned where shared
