# Workflow notes

Focused reference for **vscode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **A devcontainer or a pinned extension list (`extensions.json`) is a stronger guarantee than settings alone,** because it also fixes the versions. `.devcontainer/devcontainer.json` plus a recommended-extensions file is the most reliable way to get a uniform setup.

---

## 2. Extensions

- **Install as few as possible, and prefer the language's own tool over an editor extension.** The TypeScript compiler, ESLint, and Prettier all ship CLIs that CI runs; an editor plugin that reimplements them will eventually disagree.
- **Never let two formatters or two linters be active.** ESLint with a formatter rule plus Prettier is a classic conflict; pick Prettier for formatting and ESLint with `eslint-config-prettier` for everything else.
- **Pin versions in `extensions.json`** so a breaking release of an extension cannot change behaviour across the team.
- **A language server should be the project's own,** where it exists: `typescript.tsdk` pointed at `node_modules/typescript` rather than the bundled server, so the editor checks against the version that builds the code.
- **Audit extensions periodically** — they run with full filesystem access, and a compromised extension is a supply-chain incident with no other signal.

---

## 3. TypeScript & JavaScript

- **Point the TS server at the workspace's TypeScript** (`typescript.tsdk`) and keep `strict` in `tsconfig.json`. The editor's own TS version lags and will disagree with CI; this setting removes the disagreement.
- **The editor shows a file's problems via the TS server, but `tsc --noEmit` is the authority** — the editor skips some checks and only analyses the open project graph.
- **Enable `strictNullChecks` in the tsconfig, not with an editor flag.** Nullability is a compiler decision; a relaxed editor and a strict build is a trap.
- **For a monorepo, open the repository root, not a package,** so project references and cross-package resolution work. Opening the wrong folder is the usual cause of phantom "cannot find module" errors in VS Code.
