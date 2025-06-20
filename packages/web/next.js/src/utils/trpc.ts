import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@web/server/routes/_app';

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    // browser should use relative path
    return '';
  }
  if (process.env.VERCEL_URL) {
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
};

const trpcLink = httpBatchLink({
  /**
   * If you want to use SSR, you need to use the server's full URL
   * @see https://trpc.io/docs/v11/ssr
   **/
  url: `${getBaseUrl()}/api/trpc`,
  // You can pass any HTTP headers you wish here
  async headers() {
    return {
      // authorization: getAuthCookie(),
    };
  },
});

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [trpcLink],
    };
  },
  /**
   * @see https://trpc.io/docs/v11/ssr
   **/
  ssr: false,
});

export const trpcClient = createTRPCClient<AppRouter>({
  links: [trpcLink],
});
