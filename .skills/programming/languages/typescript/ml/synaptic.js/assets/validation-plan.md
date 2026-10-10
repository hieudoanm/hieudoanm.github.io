# Synaptic Best Practices: Validation Plan

Use this plan to verify work guided by [Synaptic Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Determinism: seed-based trainers/random where supported; snapshot tests on JSON.**
- [ ] **Watch overfitting — tiny datasets → validation split + early stop.**
- [ ] **Document the normalization transform; predictions interpreted in the original scale.**
- [ ] **JS engines fine for small nets; batch inference in typed-array loops.**
- [ ] **For larger/dense workloads, consider WebAssembly/tensor backends (Synaptic is a learning tool — 100s of params, not millions).**
- [ ] **Avoid per-call allocation churn; preallocate activation arrays.**

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
