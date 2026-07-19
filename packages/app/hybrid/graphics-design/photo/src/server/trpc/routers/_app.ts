import { router } from '../trpc';
import { openrouterRouter } from './openrouter';

export const appRouter = router({
  openrouter: openrouterRouter,
});

export type AppRouter = typeof appRouter;
