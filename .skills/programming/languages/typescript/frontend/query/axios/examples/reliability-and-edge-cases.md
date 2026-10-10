# Axios Best Practices: 4. Error Handling

## Source guidance

This example applies the **4. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Catch and translate at the boundary — typed failures for callers:**
- **`axios.isAxiosError` narrows; distinguish network vs HTTP errors (`err.code`/`err.request`/`err.response`).**
- **Never swallow — convert errors into the domain shape for the UI layer.**

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for axios-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
