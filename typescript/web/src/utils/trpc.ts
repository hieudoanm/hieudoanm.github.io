import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '../server/routers/_app';

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    if (window.location.host.includes('https://hieudoanm.github.io')) {
      return 'https://hieudoanm.vercel.app';
    }
    return ''; // browser should use relative path
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,

          async headers() {
            return {};
          },
        }),
      ],
    };
  },
  ssr: false,
});
