# nvm: Workflow Checklist

A practical run sheet for applying [nvm](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Install: **Install via the official script, not npm.** nvm is a shell library sourced from nvm.sh; the nvm npm package is deprecated and does not do this job
- [ ] 1. Install: **Review the script before piping it to bash.** It edits your shell profile; that deserves a read, especially on a work machine
- [ ] 2. Pinning Per Project: **Commit a .nvmrc at the repo root.** This is the single highest-value thing nvm does: it makes the Node version a reviewable part of the codebase instead of tribal knowledge
- [ ] 2. Pinning Per Project: **A major version (24) is usually better than an exact patch (24.21.0).** The major floats to the latest patch, so you get security fixes without a PR, and the file does not churn
- [ ] 3. LTS Policy: **Target the Active LTS for anything long-lived.** As of this writing that is Node 24 ("Krypton"); Node 26 is Current and is not yet the LTS line
- [ ] 3. LTS Policy: **Node majors become Active LTS in roughly October of their release year and Maintenance LTS the following April**, then EOL after ~30 months. Check the release schedule before choosing
- [ ] 4. Daily Commands: **nvm run/nvm exec beat switching when you need one command.** They leave your shell on the current version, so a cd .. after a test run does not silently change your toolchain
- [ ] 4. Daily Commands: **nvm 0.40's .nvmrc fallback in nvm run/nvm exec is not reliable** when no .nvmrc resolves — it falls back to the active version. Pass an explicit version when the result matters
- [ ] 5. Global Packages: **Global packages are per Node version, by design.** Something installed under 24 is invisible under 22. This is not a bug and not something to work around
- [ ] 5. Global Packages: **Do not rely on globals for project dependencies.** If a script needs it, put it in devDependencies and run it through the package manager

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
