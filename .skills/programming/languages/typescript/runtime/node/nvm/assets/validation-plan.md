# nvm: Validation Plan

Use this plan to verify work guided by [nvm](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Running nvm from sh, a Makefile, or a non-interactive shell**, where the function was never defined
- [ ] **Using a production daemon on an nvm Node** — the service user cannot reach ~/.nvm
- [ ] **Depending on global packages** that exist only under one version
- [ ] **No .nvmrc, or one holding an exact patch** that you then have to bump by hand forever
- [ ] **Floating to node or Current** instead of the LTS line
- [ ] **.nvmrc in a subdirectory of a monorepo** while CI reads the root one
- [ ] **Trusting the nvm run fallback** when no .nvmrc resolved, in 0.40
- [ ] **Piping the install script to bash without reading it** on a machine whose profile it will edit
- [ ] **Running nvm install inside a Dockerfile**, making container boot depend on the network
- [ ] **Leaving nvm alias default unset**, so fresh shells pick the newest version installed

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
