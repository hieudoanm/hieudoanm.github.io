# TanStack Query Best Practices: Workflow Checklist

A practical run sheet for applying [TanStack Query Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. QueryClient & Defaults: **One client; defaults used intentionally:**
- [ ] 1. QueryClient & Defaults: **Provide at the root; per-query overrides on top of the defaults.**
- [ ] 2. Query Keys: **Keys are the cache schema — hierarchical and serializable:**
- [ ] 2. Query Keys: **Keys stable (no inline object identity churn — array membership).**
- [ ] 3. useQuery & States: **useQuery per resource; states explicit:**
- [ ] 3. useQuery & States: **isLoading (no data) vs isFetching (background refetch) rendered distinctly.**
- [ ] 4. Mutations & Cache Updates: **useMutation updates the cache — invalidateQueries as the default, setQueryData for surgical:**
- [ ] 4. Mutations & Cache Updates: **Invalidate onSuccess (refetch updated data); optimistic with rollback (onError: invalidate).**
- [ ] 5. Infinite & Prefetching: **useInfiniteQuery for pagination/getNextPageParam:**
- [ ] 5. Infinite & Prefetching: **prefetchQuery/ensureQueryData at route level for fast mounts.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
