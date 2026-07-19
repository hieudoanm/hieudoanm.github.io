# Review checklist

Focused reference for **vscode-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
