# TanStack Query Best Practices: 4. Mutations & Cache Updates

## Source guidance

This example applies the **4. Mutations & Cache Updates** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`useMutation` updates the cache — `invalidateQueries` as the default, `setQueryData` for surgical:**
- **Invalidate onSuccess (refetch updated data); optimistic with rollback (`onError: invalidate`).**
- **Mutation keys mirror resource keys; `onSettled` for teardown.**

## Example

```tsx
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ordersKey }),
});

// optimistic
await queryClient.cancelQueries({ queryKey: ordersKey });
queryClient.setQueryData(ordersKey, (old) => [newItem, ...(old ?? [])]);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tanstack-query-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
