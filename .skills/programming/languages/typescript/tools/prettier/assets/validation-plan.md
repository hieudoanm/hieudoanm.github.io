# Prettier: Validation Plan

Use this plan to verify work guided by [Prettier](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **A floating Prettier range** (^3.9.0), which silently changes formatting on unrelated upgrades
- [ ] **eslint-plugin-prettier still installed**, duplicating work and producing poor diagnostics
- [ ] **eslint-config-prettier not last in extends**, so stylistic rules resurrect and fight the formatter
- [ ] **Importing from eslint-config-prettier instead of /flat**, which is the wrong shape for ESLint 10
- [ ] **Expecting Prettier to sort imports or catch bugs** — it does neither
- [ ] **A prettier.config.js in a CommonJS package**, which throws on load; use .mjs
- [ ] **Missing .prettierignore**, so CI reformat-minutes of generated files
- [ ] **CI running --write**, which masks unformatted code instead of failing on it
- [ ] **Abusing prettier-ignore**, which is a way of saying "I don't want to discuss this" rather than a formatting tool
- [ ] **Migrating to Biome for a formatter plugin you actually depend on**, then losing the plugin

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
