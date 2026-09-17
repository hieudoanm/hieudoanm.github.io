# Implementation notes

Focused reference for **github-packages-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Tag-driven versions keep registry + git aligned; CI is the only publisher.**

---

## 4. Consuming Private Packages

- **Consumer `.npmrc` points the scope at the registry; `npm ci` respects it:**

```ini
@myorg:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

- **Paid/private read needs the appropriate token scoping; public packages resolve similarly.**
- **Pin with lockfile already covering the graph (auth read-only in CI builds).**

---

## 5. Versions & Semantics

- **Release tags → version ceremony (`npm version` + `git push --tags`); the `v*` pattern grounded.**
- **Deprecate/`npm unpublish` carefully — consumers hold the lock; communicate removals.**
- **Changelog per release from commits + labels (release-please/GitHub releases).**
