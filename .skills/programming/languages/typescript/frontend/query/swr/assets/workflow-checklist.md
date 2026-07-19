# SWR Best Practices: Workflow Checklist

A practical run sheet for applying [SWR Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Keys & FETCHERS: **Keys are the cache identity — stable strings/arrays:**
- [ ] 1. Keys & FETCHERS: **Keys: serializable, unique per resource; object keys (arrays) supported — stable references critical.**
- [ ] 2. Revalidation Strategy: **Focus/interval/offline revalidation configured deliberately:**
- [ ] 2. Revalidation Strategy: **Default revalidation keeps freshness; disable where the data is static (revalidateIfStale: false).**
- [ ] 3. Mutations: **useSWRMutation/mutate for post-data changes — optimistic UI + rollback:**
- [ ] 3. Mutations: **Optimistic: mutate(local, { optimisticData, rollbackOnError }) (SWR v2 syntax for the exact hook).**
- [ ] 4. Fallback & Hydration: **SSR/CSR fallback — fallback map pre-seeds SWR cache:**
- [ ] 4. Fallback & Hydration: **SWRConfig global defaults (fetcher, interval, keySerializer) centralized.**
- [ ] 5. Loading & Errors: **{ data, error, isLoading, isValidating } named — states rendered distinctly:**
- [ ] 5. Loading & Errors: **isValidating signals background refetch — never block UI on it.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
