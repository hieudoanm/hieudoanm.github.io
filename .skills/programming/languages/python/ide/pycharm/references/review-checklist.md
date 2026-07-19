# Review checklist

Focused reference for **pycharm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 7. JetBrains Shared Conventions

- **`.idea/` is per-user; commit `codeStyles/`, `inspectionProfiles/`, and `.run/`, ignore the rest**, with explicit re-includes in `.gitignore` (git will not descend into an ignored directory).
- **An excluded directory is invisible to every inspection, refactoring, and search.**
- **Settings are `This computer` or project-scoped**; anything shared belongs in a committed config file, not a personal setting.
- **The Toolbox App manages installs and plugin engines**; two engines for the same plugin explain occasional version-mismatch diagnostics.

---

## General Rules of Thumb

- The project's tool (`uv`/`poetry`/`venv`) owns the environment; the IDE reads it, never creates a competing one.
- Commit the lockfile and `.python-version`; ignore `.venv/` and the interpreter path.
- Mark `src/` as Sources or imports resolve to the installed copy.
- One formatter/linter from the repo, configured in the IDE to match; pre-commit hooks in the repo are the authority.
- pytest with the project's rootdir; type checker reads the same config as CI.
- Debugger for control flow, profiler for speed; notebooks stay thin over importable modules.

---

## Quick-Start Checklist

- [ ] Interpreter set from the project's environment tool (`uv`/`poetry`/`venv`), not an ad-hoc one
- [ ] `.venv/` and interpreter paths ignored; lockfile and `.python-version` committed
- [ ] `src/` marked as Sources, or imports resolve to the installed copy
- [ ] Python version in the IDE matches the CI/CI-runtime version
- [ ] Formatter and linter configured from the repo's config files
- [ ] Type checker (mypy/pyright) reading the same config as CI
- [ ] pytest configured as the test runner with the correct rootdir
- [ ] CI runs the real test suite, not a no-op
- [ ] Profiler verified to run on a realistic workload
- [ ] Notebook kernel bound to the project interpreter, if notebooks are used
- [ ] Reusable logic in importable modules, notebooks thin
- [ ] `.idea/` ignored except `run/`, `codeStyles/`, `inspectionProfiles/`
- [ ] Pre-commit hooks owned by the repo, not the IDE's commit dialog
