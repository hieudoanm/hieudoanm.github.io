---
name: "vscode-best-practices"
description: "Best practices for Visual Studio Code — settings committed not personal, workspace vs user settings, the extension set kept minimal, ESLint/Prettier/TS Server matching CI, launch configurations, and remote development. Use when configuring, debugging, or reviewing a project in VS Code."
tags:
  - "programming"
  - "development"
  - "developer-tools"
  - "editor"
  - "vscode"
when_to_use: "Use when configuring, debugging, or reviewing a project in VS Code."
prerequisites:
  - "Basic familiarity with the project and the problem being addressed."
  - "For implementation, access to the relevant source code or development environment."
related_skills:
  - "../zed/SKILL.md"
  - "../antigravity/SKILL.md"
  - "../cursor/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
# VS Code

VS Code is the most widely used editor and the weakest default configuration in most repositories. Out of the box it is fast, extensible, and quietly opinion-free: **nothing about the project is enforced, and every developer's setup differs**. Practical VS Code work is about **committing the settings that define the project, keeping the extension set small, and making the editor's diagnostics the same checks CI runs**. Runtime and build conventions still live in the language skills; this file is about the editor.

_Verified against VS Code 1.10x (September 2026) with the built-in TypeScript server, ESLint 9 flat config, and Prettier 3. Neovim and Zed are covered in [neovim.md](../neovim/SKILL.md) and [zed.md](../zed/SKILL.md); AI-first forks in [cursor.md](../cursor/SKILL.md) and [antigravity.md](../antigravity/SKILL.md)._

---

## 1. Settings: Three Scopes

- **Three scopes, and the difference matters.** User settings live in your profile; workspace settings in `.vscode/settings.json` (committed); folder settings per folder. A setting that belongs to the project belongs in workspace settings.
- **`settings.json` supports language-scoped overrides** (`"[typescript]": { "editor.defaultFormatter": ... }`) — prefer these over one global formatter, which then has to be excluded for every other language.
- **Never rely on a user setting for anything a teammate needs.** "I have Prettier on save" is not a project convention; a committed `editor.formatOnSave` scoped to the right language is.
- **`editor.formatOnSave` with `editor.defaultFormatter` must name the same formatter CI uses** (Prettier, not the built-in TS formatter), or every save produces a diff CI then reverts.
- **`files.trimTrailingWhitespace`, `files.insertFinalNewline`, and `files.eol` are cheap to commit** and eliminate a whole class of whitespace-only review noise.

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" },
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "[python]": { "editor.defaultFormatter": "ms-python.black-formatter" },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

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

---

## 4. Debugging

- **`.vscode/launch.json` is worth committing** — it makes "how to run this" a reviewable file rather than tribal knowledge, and it works in every editor that implements the spec.
- **Launch configurations need the right `runtimeExecutable` and `env`.** A Node app launched without the project's `NODE_ENV` or `.env` loaded will fail in a way that looks like an application bug.
- **For the browser, Chrome DevTools remains more capable than the editor** for network and performance; use the editor's debugger for quick iteration and DevTools for anything you are actually investigating.
- **Attach to a running process rather than relaunching** when the thing you are debugging is a server that has state or a scheduler; relaunching changes the timing you are trying to observe.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "API (watch)",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "skipFiles": ["<node_internals>/**"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 5. Remote & Containers

- **The dev container is the strongest way to make a setup uniform,** because it pins the OS, toolchain, and extensions together. Prefer it over a long "install these 12 things" README.
- **Remote-SSH and Dev Containers both need the extensions installed on the remote side,** not locally; an extension that only exists locally does not apply to a remote file.
- **Keep the container definition minimal and committed,** and avoid baking anything secret into it — use a documented env file or the host's environment.

---

## General Rules of Thumb

- Project behaviour goes in `.vscode/settings.json` or a devcontainer; personal preferences stay in user settings.
- Pin extension versions; keep the set small and prefer the language's own CLI over an editor reimplementation.
- `typescript.tsdk` pointed at the workspace's TypeScript; `tsc --noEmit` is the authority.
- One formatter, named in `editor.defaultFormatter`, scoped per language, matching CI.
- Commit `.vscode/launch.json`; make "how to run this" reviewable.
- Open a monorepo at its root, not a package.
- Review the devcontainer for anything secret before committing it.

---

## Quick-Start Checklist

- [ ] `.vscode/settings.json` committed with formatter, EOF, and trim settings
- [ ] `editor.defaultFormatter` scoped per language, not one global
- [ ] `editor.codeActionsOnSave` running the project's ESLint fix, not a reimplementation
- [ ] ESLint and Prettier not both applying formatting (config-prettier wired)
- [ ] `extensions.json` pinning recommended extension versions
- [ ] `typescript.tsdk` pointed at the workspace's `node_modules/typescript`
- [ ] `tsc --noEmit` run in CI as the type authority
- [ ] `.vscode/launch.json` committed for the main run targets
- [ ] Launch configuration loads the right `.env`/`NODE_ENV`
- [ ] Monorepo opened at the repository root
- [ ] Devcontainer or documented setup committed instead of a long README
- [ ] No secrets in the devcontainer or launch config
