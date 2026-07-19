# npm Best Practices: Workflow Checklist

A practical run sheet for applying [npm Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. package.json: **"type": "module" explicit; engines pins Node; main/exports coherent:**
- [ ] 1. package.json: **dependencies = runtime; devDependencies = build/test — never runtime-needed stuff in dev.**
- [ ] 2. Lockfiles & Determinism: **Commit package-lock.json — the lockfile reproduces the graph:**
- [ ] 2. Lockfiles & Determinism: **npm ci in CI (fails on lockfile mismatch — the true contract); npm install for dev evolution.**
- [ ] 3. Scripts & Lifecycle: **npm run scripts as the convention — build, test, lint, typecheck:**
- [ ] 3. Scripts & Lifecycle: **Compose with &&/||; use -- to pass args; lifecycle hooks (pre/post) only where semantics demand.**
- [ ] 4. Workspaces & Monorepos: **workspaces: ["packages/*"] for multi-package repos — single install, hoisted dedupe:**
- [ ] 4. Workspaces & Monorepos: **Secondary package.json files consistent; npm install at root; cross-workspace files resolved.**
- [ ] 5. Publishing: **npm publish from a clean artifact — files whitelist, prepublishOnly run tests:**
- [ ] 5. Publishing: **NPM granule controls (@scope publishing via publishConfig.access/auth token as env, never inline).**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
