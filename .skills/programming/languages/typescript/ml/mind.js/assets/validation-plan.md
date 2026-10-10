# Mind.js Best Practices: Validation Plan

Use this plan to verify work guided by [Mind.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Determinism: seed where the API allows; test the upload→predict round trip.**
- [ ] **Overfitting on tiny datasets — small iterations + validation judgment.**
- [ ] **Normalization + decoding as the tested contract (unit tests on the mapping).**
- [ ] **Mind.js is a compact/lightweight learner — small parities, not deep nets.**
- [ ] **Batch predictions; avoid per-call reconfig; typed-array friendly when possible.**
- [ ] **For bigger models switch to Brain.js/TensorFlow.js — document the trigger.**

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
