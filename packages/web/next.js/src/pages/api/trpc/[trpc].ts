import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@web/server/routes/_app';

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
