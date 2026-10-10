# SWR Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] Module-scope typed `fetcher`; stable keys per resource
- [ ] `refreshInterval`/`revalidateOnFocus` deliberate per data type
- [ ] `useSWRMutation` + optimistic updates with rollback
- [ ] `SWRConfig` fallback/fetcher centralized; `preload` fast path
- [ ] `isLoading`/`error`/`isValidating` rendered distinctly
- [ ] `useSWRInfinite` for lists; dedupe interval tuned

## Example

A team applying **Quick-Start Checklist** to a SWR Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] Module-scope typed `fetcher`; stable keys per resource**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for swr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
