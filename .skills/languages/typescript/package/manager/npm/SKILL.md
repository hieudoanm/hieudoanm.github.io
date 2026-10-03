---
name: npm-best-practices
description: Best practices for the npm package manager and registry — dependency management conventions for JavaScript. Use when writing, structuring, or reviewing npm usage — covers package.json, lockfiles, scripts, publishing, scoping, and security.
---

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

```bash
npm ci          # CI/clean: installs exactly from lockfile
npm install     # updates graph + lockfile together; commit both
```

- **`npm ci` in CI (fails on lockfile mismatch — the true contract); `npm install` for dev evolution.**
- **`--save-exact` for the special few who need pinning; audit `npm ls` to diagnose dupes.**

---

## 3. Scripts & Lifecycle

- **`npm run` scripts as the convention — `build`, `test`, `lint`, `typecheck`:**

```json
"scripts": { "build": "vite build", "test": "vitest run", "check": "npm run lint && npm run test" }
```

- **Compose with `&&`/`||`; use `--` to pass args; lifecycle hooks (pre/post) only where semantics demand.**
- **`npm run` keeps the PATH sane — no global installs for tools.**

---

## 4. Workspaces & Monorepos

- **`workspaces: ["packages/*"]` for multi-package repos — single install, hoisted dedupe:**

```json
{
  "name": "repo",
  "workspaces": ["packages/*"]
}
```

- **Secondary package.json files consistent; `npm install` at root; cross-workspace files resolved.**
- **`--workspace` targeting for global builds; dependency honesty per package.**

---

## 5. Publishing

- **`npm publish` from a clean artifact — `files` whitelist, `prepublishOnly` run tests:**

```json
"files": ["dist/"], "prepublishOnly": "npm run check"
```

- **NPM granule controls (@scope publishing via `publishConfig.access`/auth token as env, never inline).**
- **Version bump via `npm version` ceremonies; tag flows (`latest`/`beta`) explicit.**

---

## 6. Security & Audits

- **`npm audit` wired into CI (fail on `high`+); `npm outdated` quarterly:**

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