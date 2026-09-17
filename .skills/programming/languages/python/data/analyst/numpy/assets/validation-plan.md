# NumPy Best Practices: Validation Plan

Use this plan to verify work guided by [NumPy Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Views vs copies: view()/slicing returns views; loss of data writes requires .copy().**
- [ ] **np.save/np.load (.npy) for arrays; astype before down/precision casts.**
- [ ] **@out= / out=np.empty for large in-place accumulation; avoid Python-scope churn on arrays.**
- [ ] **np.lib.stride_tricks/sliding_window_view for windowing — with the performance rules documented.**
- [ ] **Parallelism via NumPy's BLAS (no explicit threads needed); memoize the as_strided recipes.**
- [ ] **Pandas data columns ↔ df.to_numpy()/np.array(df) cast explicitly (dtypes!).**
- [ ] **np.testing.assert_array_equal/assert_allclose in tests — exact float equality never.**
- [ ] **Seed/reproduce: np.random.default_rng(seed) over global np.random.**

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
