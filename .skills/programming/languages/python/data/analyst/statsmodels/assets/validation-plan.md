# Statsmodels Best Practices: Validation Plan

Use this plan to verify work guided by [Statsmodels Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Seeded/random_state where applicable; export params/conf_int/diagnostics to parquet/CSV for reporting.**
- [ ] **Tests: assert coefficient sign/range on synthetic data; pytest-parametrize spec variants; snapshot summary outputs.**
- [ ] **Version-pin statsmodels; note formula strings in comments so the spec travels.**

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
