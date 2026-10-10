# tRPC Best Practices: 2. Procedures & Input Schemas

## Source guidance

This example applies the **2. Procedures & Input Schemas** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`zod` input/output on every procedure — untrusted input dies at the boundary:**
- **Output types derived from what you return** (`.input(...).output(...)` or inference) — the schema is the type, no drift.
- **`publicProcedure`/`protectedProcedure` operators on the procedure factory** — auth below is a procedure-level concern.

## Example

```ts
const createSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
  role: z.enum(["user", "admin"]).default("user"),
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for tRPC-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
