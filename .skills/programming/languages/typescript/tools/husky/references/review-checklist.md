# Review checklist

Focused reference for **husky-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Windows needs Git Bash or WSL.** Hooks are shell scripts; native `cmd.exe` will not run them. Document this in the contributing guide.
- **`npx` on Windows resolves to a `.cmd` shim** that hooks occasionally mis-handle. If a hook behaves differently on Windows, invoke the underlying binary or use `pnpm exec` consistently across the repo.
- **WSL users with a Windows-formatted repo** should keep the repo inside the Linux filesystem — cross-filesystem Git operations on `/mnt/c` are slow and cause permission oddities.
- **CI runners on Windows are the usual source of "hook failed" reports** that are really line-ending or CRLF problems. Add a `.gitattributes` and stop debugging the hook.

---

## 9. Alternatives

- **lefthook 2.x is a single Go binary** with a YAML config, and it parallelises across hooks. Better on large repos where Husky's serial `node` startup shows up; the tradeoff is a non-npm tool in a JS project.
- **simple-git-hooks 2.x is the minimal option** — it just writes the hook files, with no `prepare` script and no indirection. Fewer moving parts, no lint-staged-style plumbing.
- **`pre-commit` (the Python tool) manages environments per hook** and is the most robust, but heaviest — it builds and caches a virtualenv per hook.
- **Pick one and do not mix.** Two managers both writing `core.hooksPath` produce a hook that runs one tool's hooks under the other's path.
- **If you have zero custom logic, you may not need any of them.** A single `pnpm test` in CI is a defensible answer to "we need a pre-commit hook".

---

## 10. Common Pitfalls

- **Pre-v9 boilerplate left in `.husky/`** (`_/husky.sh`), which either errors or silently does nothing on v9.
- **Missing `"prepare": "husky"`**, so hooks work for the developer who set them up and nobody else.
- **A whole-repo lint in `pre-commit`**, which trains the team to use `--no-verify`.
- **Fixing but not aborting** — a hook without `set -e` reports problems and commits anyway.
- **Losing the executable bit**, especially across a Windows checkout or a `core.fileMode=false` clone.
- **Relying on a hook to enforce something CI does not also check**, which makes it a suggestion rather than a control.
- **`npx commitlint` without `--no`**, allowing a mid-commit network install.
- **Assuming hooks run in CI.** They do not; clones in pipelines skip them entirely.
- **Two hook managers fighting over `core.hooksPath`.**
- **Committing `.husky/_` or `.huskyrc`** on v9, where they are dead weight.

---

## General Rules of Thumb

- Husky 9: `prepare: husky` + plain shell scripts, no `_` directory, no `husky install`.
- Hooks are committed; the wiring is per-clone, so `prepare` is not optional.
- `set -e` in every hook, under ~5 seconds for `pre-commit`.
- lint-staged for staged files, with `--fix` before formatting; full typecheck in `pre-push` and CI.
- `npx --no` for commitlint so a broken install fails fast instead of downloading.
- Repeat every enforced check in CI — hooks do not run there.
- One hook manager per repo; lefthook or simple-git-hooks if Husky's overhead shows.

---

## Quick-Start Checklist

- [ ] `husky` pinned to an exact version in `devDependencies`
- [ ] `"prepare": "husky"` present in `package.json`
- [ ] No `.husky/_` or `.huskyrc` present (v9 cleanup done)
- [ ] Every hook starts with `set -e` and is committed executable
- [ ] `pre-commit` runs only staged files, and completes in under 5 seconds
- [ ] Full typecheck and test suite run in `pre-push` and in CI
- [ ] CI re-runs every check the hooks enforce
- [ ] `commit-msg` uses `npx --no -- commitlint --edit "$1"`
- [ ] Commit config lives in `.commitlintrc.json`, not in CLI flags
- [ ] Windows/WSL requirement documented in the contributing guide
- [ ] `.gitattributes` committed to neutralise CRLF differences
- [ ] Exactly one hook manager configured repo-wide
