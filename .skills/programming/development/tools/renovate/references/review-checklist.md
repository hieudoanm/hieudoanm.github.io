# Review checklist

Focused reference for **renovate-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Review the diff for a major like any other change** — it is a dependency upgrade, which is a real code change, and the changelog is the spec.
- **When a merge breaks the build, fix the config, not the PR.** A pattern of "revert and Renovate reopens" means the automerge policy is too aggressive for that package.
- **Watch the `major/minor/patch` split in the dashboard** — a sudden flood of majors usually means a new major landed and you should plan it, not absorb 30 PRs.
- **Set the schedule so updates arrive when people are looking** (weekday mornings) rather than at 3 a.m. on a Saturday.
- **Pin versions of the tools Renovate itself depends on** (if self-hosted) with the same rigour as anything else.

---

## General Rules of Thumb

- Update classification drives everything; automerge only `patch`/`digest`.
- Group by package or ecosystem; keep lockfile-only updates in their own group; never over-group.
- `minimumReleaseAge` set — the cheapest supply-chain defence available.
- Required status checks must pass before any automerge; the needs-human label for the rest.
- Config in the repository, starting from `config:recommended`, schema-validated.
- `rangeStrategy: bump` for apps; commit lockfiles for apps, deliberate for libraries.
- Review a major's diff like code; fix the policy when a merge breaks, not the PR.

---

## Quick-Start Checklist

- [ ] Config in the repo (`renovate.json5`), extending `config:recommended`
- [ ] Schema validated after every edit
- [ ] Dependency Dashboard enabled
- [ ] `patch`/`digest` grouped and automerged on green status checks
- [ ] `major` never automerged, grouped only when required for that major
- [ ] `minimumReleaseAge` set (a few days)
- [ ] `prHourlyLimit` / `prConcurrentLimit` set
- [ ] Digest updates for pinned images automerged
- [ ] `rangeStrategy` chosen deliberately; lockfile policy documented
- [ ] Lockfile-only updates grouped separately
- [ ] Packages that have surprised you pinned to manual
- [ ] `semanticCommits` enabled for readable history
- [ ] Bot version pinned where the platform allows
