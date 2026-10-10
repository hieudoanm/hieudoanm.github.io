# Implementation notes

Focused reference for **renovate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Configuration Hygiene

- **The config is a reviewable file, so put it in the repository** (`renovate.json`, `.renovaterc.json`, or `renovate.json5`) and let it change through a PR like anything else.
- **Start from `config:recommended`** and add rules; a hand-built config misses defaults that matter.
- **Use the Dependency Dashboard** (`:dependencyDashboard`) so pending updates are visible instead of silently queued.
- **Pin the bot's own version** if the platform allows it, so a bot change does not alter the policy without review.
- **Validate the schema after every edit** — Renovate ignores unknown keys silently, and a typo means a rule that does not run.
- **Set `prHourlyLimit` / `prConcurrentLimit`** so a day with many updates does not bury the PR list.

---

## 5. Lockfiles & Range Strategy

- **`rangeStrategy` decides whether to widen the declared range, and it is a real choice:**
  - `pin` — write the exact version into the manifest. Reproducible, but noisy diffs.
  - `bump` — widen the range to the new version. Fewer merge conflicts, the common default.
  - `replace` — leave the range alone, change the lockfile only. Least visible, most confusing in review.
  - `widen` — widen only if needed.
- **Commit lockfiles for applications; be deliberate for libraries.** A library that commits its lockfile pins its consumers to your resolution.
- **A lockfile-only update is not a code change** — group it separately and do not expect a reviewer to read a 2000-line lockfile diff.
- **Digest updates for pinned images are the highest-value, lowest-risk automerge** in most repos, and the first thing to turn on if you start with none.

---

## 6. Operating the Bot
