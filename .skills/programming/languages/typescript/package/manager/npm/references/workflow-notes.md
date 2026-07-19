# Workflow notes

Focused reference for **npm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
