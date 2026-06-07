import type { AppRouter } from '@hieudoanm.github.io/server/routers/_app';
import { createTRPCClient, httpBatchLink } from '@trpc/client';

const getBaseUrl = (): string => {
  if (
    typeof window !== 'undefined' &&
    !(window as any).location.href.includes('https://hieudoanm.github.io/chat')
  ) {
    return '';
  }
  if (
    typeof window !== 'undefined' &&
    (window as any).location.href.includes('https://hieudoanm.github.io/chat')
  ) {
    return 'https://hieudoanm-chat.vercel.app';
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

export const trpcClient = createTRPCClient<AppRouter>({
  links: [trpcLink],
});
