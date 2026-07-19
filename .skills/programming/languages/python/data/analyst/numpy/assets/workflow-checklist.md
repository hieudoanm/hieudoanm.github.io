# NumPy Best Practices: Workflow Checklist

A practical run sheet for applying [NumPy Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Creating Arrays: **Explicit creators over ad-hoc lists; dtype chosen deliberately:**
- [ ] 1. Creating Arrays: **np.array(...) from existing data; np.copy on views that mutate — never alias surprises.**
- [ ] 2. Broadcasting & Shapes: **Broadcasting aligns trailing dimensions:**
- [ ] 2. Broadcasting & Shapes: **Check shape/ndim before ops; use reshape/transpose/expand_dims explicitly for alignment.**
- [ ] 3. Vectorization: **Vectorize the hot paths — masks, ufuncs, reductions:**
- [ ] 3. Vectorization: **No Python for-loops over element-by-element math; np.where, np.select for branches.**
- [ ] 4. Masks & Indexing: **Boolean masks first-class; fancy indexing returns copies (know view vs copy):**
- [ ] 4. Masks & Indexing: **np.ix_ for orthogonal indexing; .copy() after any view-taking op that mutates.**
- [ ] 5. Memory & Performance: **Views vs copies: view()/slicing returns views; loss of data writes requires .copy().**
- [ ] 5. Memory & Performance: **np.save/np.load (.npy) for arrays; astype before down/precision casts.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
