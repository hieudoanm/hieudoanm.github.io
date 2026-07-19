# ml5.js Best Practices: Validation Plan

Use this plan to verify work guided by [ml5.js Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Weights load over network — bundle/cache for production; CDN pinned.**
- [ ] **Inference on the main thread can jank — requestAnimationFrame throttling for video.**
- [ ] **Memory: destroy classifiers not in use; cap continuous inference.**
- [ ] **Pretrained biases documented — model cards/caveats acknowledged in projects.**
- [ ] **No real-time personal data storage without consent; demos sanitized.**
- [ ] **Version pin ml5 + TensorFlow deps; tests machine hands-down only (no visual asserts).**

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
