# Redux Best Practices: Workflow Checklist

A practical run sheet for applying [Redux Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Slices & Reducers: **One slice per domain feature; createSlice colocated:**
- [ ] 1. Slices & Reducers: **Immer lets reducers write as if mutable — but keep them pure and deterministic** (no I/O, no Date.now, no new arrays via push only)
- [ ] 2. Actions & Payloads: **Payloads are data, not instructions — nouns over verbs:**
- [ ] 2. Actions & Payloads: **Actions dispatched by useDispatch in components/sagas — never touch the store directly.**
- [ ] 3. Selectors: **Selectors are the read boundary — createSelector memoizes derived state:**
- [ ] 3. Selectors: **Components read via useSelector(selectX) — one selector per dependency, granular re-renders.**
- [ ] 4. Async & Middleware: **createAsyncThunk for the promise lifecycle:**
- [ ] 4. Async & Middleware: **pending/fulfilled/rejected handled in extraReducers — loading/error state extruded from the same lifecycle.**
- [ ] 5. RTK Query (when data is remote): **For server state, prefer RTK Query endpoints over hand-managed thunk refetching:**
- [ ] 5. RTK Query (when data is remote): **Invalidation/caching handled by the library** — declare providesTags/invalidatesTags, don't hand-roll refetch orchestration

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
