import { appRouter } from '@/server/trpc/routers/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

const handler = createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export default handler;
