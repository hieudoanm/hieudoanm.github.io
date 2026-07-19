# Workflow notes

Focused reference for **husky-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
