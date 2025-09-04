import { procedure, router } from '../trpc';

export const appRouter = router({
  health: procedure.query(() => {
    return { status: 'OK' };
  }),
});

export type AppRouter = typeof appRouter;
