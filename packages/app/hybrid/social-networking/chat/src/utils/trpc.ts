import type { AppRouter } from '@/server/trpc/routers/_app';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const trpcLink = httpBatchLink({
  url: `${getBaseUrl()}/api/trpc`,
  async headers() {
    return {};
  },
});

export const trpcHook = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [trpcLink],
    };
  },
  ssr: false,
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [trpcLink],
});
