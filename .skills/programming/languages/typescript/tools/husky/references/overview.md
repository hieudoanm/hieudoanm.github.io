# Overview

Focused reference for **husky-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
