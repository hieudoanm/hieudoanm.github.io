# D3 Best Practices: Validation Plan

Use this plan to verify work guided by [D3 Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Bound SVG elements to data count (1,000–10k OK; 100k = canvas territory):**
- [ ] **Canvas/d3-shape + d3-geo for dense; avoid per-frame DOM diffing.**
- [ ] **Draw large paths (d3.line/d3.geoPath) once; update attributes only, not geometry text.**

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
