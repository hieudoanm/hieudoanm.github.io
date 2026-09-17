# SWR Best Practices: 5. Loading & Errors

## Source guidance

This example applies the **5. Loading & Errors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`{ data, error, isLoading, isValidating }` named — states rendered distinctly:**
- **`isValidating` signals background refetch — never block UI on it.**
- **Error shape normalized in the fetcher (`HTTP n`) for consistent UI.**

## Example

```tsx
const { data, error, isLoading, isValidating } = useOrders();
if (isLoading) return <Spinner />;
if (error) return <ErrorDetail status={error.status} />;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for swr-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
