---
name: husky-best-practices
description: Best practices for Git hooks with Husky — v9 setup, hook script format, lint-staged and commitlint integration, CI parity, and when to use lefthook instead. Use when adding or debugging pre-commit hooks in a JS/TS repo.
---

# Husky

Husky puts a `core.hooksPath` entry in your repo so that Git runs scripts in `.husky/` instead of `.git/hooks/`. That single indirection is the whole point: **hooks become committed, reviewable, and identical on every machine** — no more "my pre-commit hook worked but yours didn't". Practical Husky work is mostly about **getting the v9 setup right, keeping hooks fast, and putting the real work in tooling that Husky only triggers**.

_Verified against Husky 9.1.7, lint-staged 17.6.0, commitlint 21.2.3. Alternatives checked: lefthook 2.1.14, simple-git-hooks 2.14.0._

---

## 1. What Husky Actually Does

- **It only sets `core.hooksPath` to `.husky` and runs it.** Every bit of logic lives in your scripts. Husky is a loader, not a framework — do not build behaviour into it that belongs in lint-staged or a script.
- **Hooks are per-clone Git configuration, not committed files.** The `.husky/` directory is committed; the fact that Git is pointed at it is not. That is why the `prepare` script below is load-bearing.
- **Hooks do not run in CI by default.** A clone in a pipeline gets no hook execution. Anything a hook enforces must be re-run explicitly in CI, or it is unenforced.
- **Husky is npm-installed, not global.** A globally installed Husky is a different program from your repo's; always invoke the local one.
- **Requires Git 2.x and Node 18+.** On Windows, Git Bash or WSL is needed — see §8.

---

## 2. Setup

- **Husky 9 removed `husky install` and the `husky init` boilerplate.** If you find `. "$(dirname -- "$0")/_/husky.sh"` in a hook, that file is pre-v9. The `_` directory was removed because it was the source of most Husky setup bugs.
- **`husky init` is optional — hand-creating the directory works.** Husky 9 needs only the folder and the `prepare` script.
- **Add `"prepare": "husky"` to `package.json`.** This is what re-points `core.hooksPath` after every `npm install` or `git clone`. Omit it and hooks silently stop working for everyone but you.

```bash
npx husky init
```

```json
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "husky": "9.1.7"
  }
}
```

- **Pin Husky exactly** (`"9.1.7"`, not `^9.1.7`). Husky is a build-affecting dependency; a floating range means hooks can change under a lockfile refresh.
- **Delete `.husky/_` and `.huskyrc` if they exist** after upgrading to v9. They are dead files that confuse the next reader.
- **If your package manager runs lifecycle scripts, `prepare` is covered by default.** If you explicitly disabled scripts (`npm ci --ignore-scripts`, or a pnpm `approve-builds` block), `prepare` never fires and hooks never install.

---

## 3. Hook Scripts

- **A v9 hook is a plain shell script with no preamble.** No shebang boilerplate, no sourcing Husky internals.

```sh
# .husky/pre-commit
npx lint-staged
```

- **Make hooks executable** (`chmod +x .husky/pre-commit`). Husky will not do it for you in every clone path, and a non-executable hook fails opaquely.
- **Add a shebang only when you need a specific interpreter.** `#!/usr/bin/env bash` for arrays and `set -euo pipefail` semantics; plain POSIX otherwise.
- **`set -e` in every hook.** A lint failure that does not abort the commit is worse than no hook at all, because it reads as enforcement.
- **Share logic through a `package.json` script, not a sourced file.** `npx lint-staged` beats sourcing `scripts/hook-helpers.sh` — it works on Windows and in CI.
- **Commit your hooks with the executable bit set** (`git update-index --chmod=+x`). A hook that loses its bit on a Windows checkout is a common CI-only failure.

| Hook | Fires on | Use it for |
| --- | --- | --- |
| `pre-commit` | `git commit` | Staged lint/format — keep under ~5s |
| `commit-msg` | `git commit` | Commit message format |
| `pre-push` | `git push` | Typecheck, unit tests, full lint |
| `post-merge` | `git merge` | `npm install` after dependency changes |
| `post-checkout` | `git checkout` | Rebuild generated artifacts |

---

## 4. lint-staged

- **Never lint the whole repo in `pre-commit`.** It is quadratic in practice — a large repo makes committing genuinely painful and people reach for `--no-verify`. Staged-only is the design, not an optimisation.
- **lint-staged 17 backs staged files and shares one config.** Keep the list of tools in one place so every hook invocation is identical.

```js
// lint-staged.config.mjs
export default {
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
  '*.css': ['stylelint --fix'],
};
```

- **`--fix` then format, in that order.** Fixing can introduce new formatting; running the formatter last is what keeps the file clean.
- **Auto-fixing hooks surprise people.** Announce it in the contributing docs — a hook that rewrites your staged code should not be a surprise on someone's first commit.
- **Do not add typechecking to `pre-commit`.** A whole-project `tsc --noEmit` is too slow for a commit; it belongs in `pre-push` and in CI.

---

## 5. Commit Messages

- **commitlint and Husky are independent** — Husky only calls the command. Wire them yourself so you can drop one without touching the other.
- **Configure it in `.commitlintrc.json`, not CLI flags**, so local and CI agree.

```json
// .commitlintrc.json
{ "extends": ["@commitlint/config-conventional"] }
```

```sh
# .husky/commit-msg
npx --no -- commitlint --edit "$1"
```

- **`npx --no` is the correct invocation.** It forbids npx from silently installing commitlint, which turns a broken local setup into a network call mid-commit.
- **`--edit "$1"`** lets commitlint rewrite the file and report inline, rather than failing opaquely.
- **Skip `commit-msg` for `git merge`/`--amend` on `Merge branch` messages** with `npx commitlint --edit "$1" || grep -q '^Merge' "$1"` if your workflow needs it — the conventional-commits rule rejects merge commits.

---

## 6. Keeping Hooks Fast

- **Budget: under 5 seconds for `pre-commit`.** Past that, developers bypass with `--no-verify` and the enforcement is theatre.
- **Push the slow checks to `pre-push` and CI.** Full typecheck, test suite, and lint belong there.
- **Measure before optimising** — `time git commit` on an empty change tells you the real cost.
- **CI must run the same commands the hooks do.** A `pre-commit` that is never repeated in CI is a local convenience, not a control.

```yaml
# .github/workflows/ci.yml — the checks hooks do NOT cover
- run: pnpm typecheck
- run: pnpm lint
- run: pnpm test
```

- **Guard expensive hooks on what changed** where cheap, but prefer running the full check in CI rather than reimplementing change detection in a hook.

---

## 7. Monorepos

- **One `.husky` at the repo root, not per package.** The root is the only place Git reads `core.hooksPath` from.
- **Have the root hook call into the workspace**, e.g. `pnpm -r --filter './packages/*' typecheck`. Do not try to make one hook aware of package boundaries.
- **Commit the root `.husky` even if every package has its own tooling.** It is the only one Git will execute.
- **Per-package `prepare` scripts will fight the root one.** Ensure sub-packages do not each run `husky` and re-point the path at their own directory.

---

## 8. Platform Notes

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
