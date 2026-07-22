import type { AppRouter } from '@hieudoanm.github.io/server/trpc/routers/_app';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

const getBaseUrl = (): string => {
  if (
    typeof window !== 'undefined' &&
    !window.location.href.includes('https://hieudoanm.github.io/chat')
  ) {
    return ''; // browser should use relative path
  }
  if (
    typeof window !== 'undefined' &&
    window.location.href.includes('https://hieudoanm.github.io/chat')
  ) {
    return 'https://hieudoanm-chat.vercel.app'; // reference to vercel.com
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`; // reference for vercel.com
  }
  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`; // reference for render.com
  }
  return `http://localhost:${process.env.PORT ?? 3000}`; // assume localhost
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

export const trpcHook = createTRPCNext<AppRouter>({
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
