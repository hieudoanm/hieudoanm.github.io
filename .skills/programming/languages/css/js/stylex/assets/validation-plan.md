# stylex: Validation Plan

Use this plan to verify work guided by [stylex](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with CSS and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] Zero runtime CSS logic: styles compile at build → bundled stylex runtime is tiny
- [ ] Atomic class reuse shrinks CSS file; class counts grow but bytes stay similar
- [ ] SSR works without special server extraction (classes deterministic)
- [ ] Forgetting the Babel/Vite plugin → styles won't transform and break
- [ ] Conditional strings className={condition ? 'x' : 'y'} instead of stylex.props
- [ ] Dynamic key lookups (tokens[color] as object) lose type safety

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
