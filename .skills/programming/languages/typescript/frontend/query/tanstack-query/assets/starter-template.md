# TanStack Query Best Practices: Starter Template

A reusable starting point derived from the **4. Mutations & Cache Updates** section of [TanStack Query Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```tsx
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ordersKey }),
});

// optimistic
await queryClient.cancelQueries({ queryKey: ordersKey });
queryClient.setQueryData(ordersKey, (old) => [newItem, ...(old ?? [])]);
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
