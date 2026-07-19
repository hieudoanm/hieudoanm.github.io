# tRPC Best Practices: Starter Template

A reusable starting point derived from the **1. Router Structure** section of [tRPC Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
