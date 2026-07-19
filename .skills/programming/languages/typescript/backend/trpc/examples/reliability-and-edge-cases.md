# tRPC Best Practices: 5. Error Handling

## Source guidance

This example applies the **5. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`TRPCError` with a code + message is the error contract; map domain errors to codes:**
- **An error-formatter maps unknown → `INTERNAL_SERVER_ERROR` at the boundary** — service-layer exceptions converted to codes; never leak stack traces.

## Example

```ts
const user = await repo.byId(input.id);
if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "user missing" });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tRPC-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
