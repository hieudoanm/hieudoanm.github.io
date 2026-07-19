# Axios Best Practices: Starter Template

A reusable starting point derived from the **4. Error Handling** section of [Axios Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
try {
  return await getOrder(id);
} catch (err) {
  if (axios.isAxiosError(err) && err.response?.status === 404) {
    throw new NotFoundError();
  }
  throw err;
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
