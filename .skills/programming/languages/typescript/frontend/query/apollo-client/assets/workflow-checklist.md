# Apollo Client Best Practices: Workflow Checklist

A practical run sheet for applying [Apollo Client Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Setup & Client: **One ApolloClient per app — uri, cache, link chain:**
- [ ] 1. Setup & Client: **Auth via setContext on the link (token from env/session store); the cache typed (PossibleTypes).**
- [ ] 2. Queries: **useQuery per view; loading/error explicit; fetchPolicy deliberate:**
- [ ] 2. Queries: **Default cache-first is fine; network-only/no-cache for volatile mutations.**
- [ ] 3. Mutations: **useMutation; update the cache by design:**
- [ ] 3. Mutations: **Small mutations: refetchQueries; complex ones: update(cache, { data: createOrder }) with normalized writes.**
- [ ] 4. Fragments & Schemas: **Reusable gql fragments colocated with the component; shared shape contract:**
- [ ] 4. Fragments & Schemas: **Parts reused across query/mutation — no duplicated inline fragments.**
- [ ] 5. Cache & Normalization: **Normalized by __typename + id; typePolicies for keys/merges:**
- [ ] 5. Cache & Normalization: **id always requested (or a typePolicy key) — else FieldPolicy drift.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
