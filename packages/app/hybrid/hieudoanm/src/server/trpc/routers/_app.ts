import { router } from '../trpc';
import { openrouterRouter } from './openrouter';
import { youtubeRouter } from './youtube';

export const appRouter = router({
  openrouter: openrouterRouter,
  youtube: youtubeRouter,
});

export type AppRouter = typeof appRouter;
