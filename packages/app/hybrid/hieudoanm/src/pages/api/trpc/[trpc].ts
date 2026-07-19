import { appRouter } from '@hieudoanm.github.io/server/trpc/routers/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

const handler = createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});

export default handler;
