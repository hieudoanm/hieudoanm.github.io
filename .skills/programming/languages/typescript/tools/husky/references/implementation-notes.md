# Implementation notes

Focused reference for **husky-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
