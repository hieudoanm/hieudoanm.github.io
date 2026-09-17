# Overview

Focused reference for **npm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# npm Best Practices

npm is the **default package manager + registry for Node.js** — `package.json` declares the graph, `package-lock.json` pins it. Practical npm leans on **minimal, precise `dependencies` vs `devDependencies`, `npm install` determinism via the committed lockfile, `--save-exact`/workspaces discipline, and lifecycle through `npm ci` in CI** — the lockfile is the deployment artifact; the registry is upstream of trust (pin scopes/versions).

---

## 1. package.json

- **`"type": "module"` explicit; `engines` pins Node; `main`/`exports` coherent:**

```json
{
  "name": "my-tool",
  "version": "1.0.0",
  "type": "module",
  "engines": { "node": ">=20" },
  "exports": { ".": "./dist/index.js" }
}
```

- **`dependencies` = runtime; `devDependencies` = build/test — never runtime-needed stuff in dev.**
- **`peerDependencies` for plugins (declare the host's expectation).**
- **Semver ranges deliberate: caret for app-deps, exact for binaries/shared libs.**

---

## 2. Lockfiles & Determinism

- **Commit `package-lock.json` — the lockfile reproduces the graph:**
