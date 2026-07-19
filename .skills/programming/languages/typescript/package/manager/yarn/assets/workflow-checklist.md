# Yarn Best Practices: Workflow Checklist

A practical run sheet for applying [Yarn Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Choosing Yarn & Version: **Pin packageManager (corepack) + correspond yarn.lock format:**
- [ ] 1. Choosing Yarn & Version: **Yarn Classic (node_modules, CSS-lock) vs Modern (PnP) — commit the choice in .yarnrc.yml:**
- [ ] 2. Lockfiles & Install: **Commit yarn.lock; yarn install updates graph + lock together; --immutable in CI:**
- [ ] 2. Lockfiles & Install: **Append-only lock discipline: why-answers to the frozen build are in the diff, not the drift.**
- [ ] 3. PnP vs node_modules: **PnP: zero node_modules — the dependency graph resolved from .pnp.cjs; fast, strict:**
- [ ] 3. PnP vs node_modules: **Strictness catches undeclared dependencies (same benefit as pnpm).**
- [ ] 4. Workspaces & Monorepos: **workspaces: in package.json (Modern-compatible) — one lock, dedupe:**
- [ ] 4. Workspaces & Monorepos: **yarn workspaces foreach --parallel run build for orchestration; consistent manifests.**
- [ ] 5. Scripts & Lifecycle: **yarn run for conventional commands; yarn alone = install (v1 ergonomics).**
- [ ] 5. Scripts & Lifecycle: **Lifecycle ceremonies consistent (prepublishOnly runs checks).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
