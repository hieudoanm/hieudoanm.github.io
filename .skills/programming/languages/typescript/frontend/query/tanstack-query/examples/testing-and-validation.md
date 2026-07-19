# TanStack Query Best Practices: Quick-Start Checklist

## Source guidance

This example applies the **Quick-Start Checklist** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- [ ] `QueryClient` with defaults (staleTime/retry/refetch); provided at root
- [ ] Structured query keys + factories; stable references
- [ ] `useQuery` with distinct loading/fetching/error states
- [ ] Mutations invalidate after success; optimistic `setQueryData` + rollback
- [ ] `useInfiniteQuery`/`prefetch`/suspense shapes used deliberately
- [ ] Tests use a fresh client (retry false); DevTools wired for debug

## Example

A team applying **Quick-Start Checklist** to a TanStack Query Best Practices project treats this guidance as a review gate. It checks whether the current implementation satisfies **[ ] `QueryClient` with defaults (staleTime/retry/refetch); provided at root**, records any project-specific deviation, and verifies the result with the relevant project checks before shipping.

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for tanstack-query-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
