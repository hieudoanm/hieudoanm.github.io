# GitHub Packages Best Practices: Workflow Checklist

A practical run sheet for applying [GitHub Packages Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Auth & Registry: **Per-scope config in .npmrc — never inline tokens:**
- [ ] 1. Auth & Registry: **GITHUB_TOKEN at the org's rights granularity, or a scoped PAT with read:packages:**
- [ ] 2. Package Setup: **Scoped names clean (@myorg/lib); name/version/repository consistent:**
- [ ] 2. Package Setup: **access: "restricted" for private default; "public" only for intentional OS.**
- [ ] 3. Publishing in CI: **Publish workflow — dispatch or tag-driven, build + auth + publish:**
- [ ] 3. Publishing in CI: **Tag-driven versions keep registry + git aligned; CI is the only publisher.**
- [ ] 4. Consuming Private Packages: **Consumer .npmrc points the scope at the registry; npm ci respects it:**
- [ ] 4. Consuming Private Packages: **Paid/private read needs the appropriate token scoping; public packages resolve similarly.**
- [ ] 5. Versions & Semantics: **Release tags → version ceremony (npm version + git push --tags); the v* pattern grounded.**
- [ ] 5. Versions & Semantics: **Deprecate/npm unpublish carefully — consumers hold the lock; communicate removals.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
