import type { AppRouter } from '@hieudoanm.github.io/server/trpc/routers/_app';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url:
        typeof window !== 'undefined'
          ? ''
          : `http://localhost:${process.env.PORT ?? 3000}`,
    }),
  ],
});
