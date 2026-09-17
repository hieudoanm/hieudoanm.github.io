# Volta Best Practices: Workflow Checklist

A practical run sheet for applying [Volta Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Pinning the Toolchain: **Pin in the project — volta pin writes the package.json volta block:**
- [ ] 1. Pinning the Toolchain: **volta pin node@20 / volta pin yarn@4 — the toolchain is versioned with the code.**
- [ ] 2. Setup & Environment: **Install via curl script or curl — then volta install node fetches the toolchain:**
- [ ] 2. Setup & Environment: **volta setup configures the shim (~/.volta) — shells pick the right version automatically.**
- [ ] 3. Per-Project Consistency: **Every command runs with the pinned toolchain — including npm ci/yarn install:**
- [ ] 3. Per-Project Consistency: **Lockfiles + Volta block double-ensure: pinning is declarative, lockfiles pin the graph.**
- [ ] 4. CI Integration: **CI: install Volta, run via the pinned hook:**
- [ ] 4. CI Integration: **Or honor the block directly: volta run node --version proves the engine.**
- [ ] 5. Compat & Troubleshooting: **Ensure the volta block and engines don't disagree — engines is a check, volta is the enforcer.**
- [ ] 5. Compat & Troubleshooting: **Proxy/corporate registries: VOLTA_FEATURE_PNPM etc. as needed; mirrors for offline.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
