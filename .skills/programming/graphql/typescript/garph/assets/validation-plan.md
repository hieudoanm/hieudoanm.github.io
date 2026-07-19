# garph: Validation Plan

Use this plan to verify work guided by [garph](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Skill-specific review

- [ ] Forgetting the resolver shape must mirror schema exactly (untyped key mismatch → runtime error or TS error)
- [ ] Relying on implicit any in inference for unions/interfaces loops — write them explicitly when tricky
- [ ] Not leveraging g.enum(..., {valueMap}) leading to string-only enums losing runtime values
- [ ] Over-abusing g.ref circular references without g.lazy(...) for self-references

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
