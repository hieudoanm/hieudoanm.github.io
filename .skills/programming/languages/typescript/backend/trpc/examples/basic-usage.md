# tRPC Best Practices: Basic Usage

Best practices for building TypeScript client/server APIs with tRPC — the end-to-end typed procedure framework conventions. Use when writing, structuring, or reviewing tRPC — covers routers/procedures, input schemas, middleware, context, error handling, and testing.

## Scenario

Use this example as a starting point when applying **tRPC-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Router Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
// server/
export const userRouter = router({
  list: publicProcedure.query(() => repo.list()),
  byId: publicProcedure.input(z.object({ id: z.string().uuid() }))
    .query(({ input }) => repo.byId(input.id)),
  create: protectedProcedure.input(createSchema).mutation(({ input, ctx }) =>
    svc.create({ ...input, actor: ctx.user })),
});

export const appRouter = router({ user: userRouter, health: healthRouter });
export type AppRouter = typeof appRouter;
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
