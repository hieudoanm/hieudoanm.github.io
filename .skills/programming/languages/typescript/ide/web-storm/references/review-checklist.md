# Review checklist

Focused reference for **webstorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search** — a frequent cause of "the IDE is wrong" reports in a monorepo.
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- `tsconfig.json` owns type checking; the IDE reads it, the compiler is the authority.
- Node interpreter and package manager match `.nvmrc`/`volta` and the lockfile.
- Keep `tsconfig` project references and `strict` inheritance intact in a monorepo.
- TypeScript 7 is supported and faster; plan the migration rather than deferring it.
- Debugger over `console.log`; generate source maps so breakpoints hit your source.
- Node CPU profiler for the server half, DevTools for the browser half.
- One formatter/linter from the repo, wired to the same scripts as CI.

---

## Quick-Start Checklist

- [ ] Node interpreter read from `.nvmrc`/`.node-version`/`volta`, matching CI
- [ ] Package manager aligned with the lockfile; `node_modules` state consistent
- [ ] TypeScript service set to the project's `tsconfig.json`
- [ ] `strict` in the base config, inherited by packages
- [ ] Monorepo project references (`composite`, `references`) intact
- [ ] `paths` aliases matched in both the IDE and the bundler config
- [ ] Source maps generated in dev builds so breakpoints hit source
- [ ] Framework plugin enabled for the repo's framework (React/Vue/Angular/Next)
- [ ] Prettier and ESLint configured to run the repo's binaries, Tailwind plugin matched
- [ ] ESLint flat config handled if the repo uses it
- [ ] Node CPU profiler verified on a real endpoint
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] `eslint.config.js`, `.prettierrc`, `tsconfig.json`, and lockfile committed
