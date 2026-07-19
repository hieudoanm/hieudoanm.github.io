# SWR Best Practices: Validation Plan

Use this plan to verify work guided by [SWR Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Skill-specific review

- [ ] **Focus/interval/offline revalidation configured deliberately:**
- [ ] **Default revalidation keeps freshness; disable where the data is static (revalidateIfStale: false).**
- [ ] **focused/disconnected policies per data temperament — don't blanket-disable.**
- [ ] **Deduping is automatic; keepPreviousData minimal flicker via key pattern.**
- [ ] **Massive lists: paginate/infinite (useSWRInfinite); cap response sizes.**
- [ ] **Devtools (@swr-devtools) inspect the cache; test with mutate in RTL.**

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
