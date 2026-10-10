# Biome: Validation Plan

Use this plan to verify work guided by [Biome](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Leaving indentStyle at the tab default** when migrating from Prettier — an entire repo reformats to tabs
- [ ] **Looking for organizeImports under linter**; it belongs to assist
- [ ] **Running check instead of ci in CI**, which silently formats and reports success on unformatted code
- [ ] **A bare // biome-ignore with no reason,** which Biome itself reports
- [ ] **biome-ignore-all placed mid-file,** where it is an unused suppression
- [ ] **Enabling all nursery rules** and enforcing experimental behaviour in CI
- [ ] **Applying --unsafe fixes in bulk** on a branch with real work
- [ ] **Migrating away from Prettier while depending on prettier-plugin-tailwindcss**, and losing class sorting
- [ ] **Forgetting biome migrate after a major bump,** leaving a config the binary cannot read
- [ ] **Leaving "root": true in a nested config,** which silently breaks inheritance

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
