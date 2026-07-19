# pnpm Best Practices: Workflow Checklist

A practical run sheet for applying [pnpm Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Install & Lockfile: **Commit pnpm-lock.yaml; CI with frozen lockfile — reproducibility is the contract:**
- [ ] 1. Install & Lockfile: **pnpm add <pkg> per install intent (never hand-edit deps).**
- [ ] 2. Store & Disk: **A single global store (~/.pnpm-store default) dedupes across projects:**
- [ ] 2. Store & Disk: **Symlinked node_modules — LFS-hostile? Know the deploy mode (.pnpm layout inside).**
- [ ] 3. Strictness & Phantom Deps: **Strict node_modules means no undeclared imports — the compiler catches them:**
- [ ] 3. Strictness & Phantom Deps: **allowBuilds/onlyBuiltDependencies gates postinstall scripts (supply-chain control).**
- [ ] 4. Workspaces: **packages/* + pnpm-workspace.yaml for monorepos:**
- [ ] 4. Workspaces: **Hoisted node_modules: no accidental global resolution; pnpm -r --filter commands target subsets.**
- [ ] 5. Overrides & Struggles: **overrides (pnpm) force resolutions — constrained, documented:**
- [ ] 5. Overrides & Struggles: **Avoid blanket overrides — pin with a reason; audit the subgraph (pnpm why <pkg>).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
