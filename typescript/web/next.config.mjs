import createMDX from '@next/mdx';
import million from 'million/compiler';
import nextPWA from 'next-pwa';
import remarkGfm from 'remark-gfm';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
const PLATFORM = process.env.PLATFORM ?? '';

const withPWA = nextPWA({
  dest: 'public',
  skipWaiting: true,
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
  fallbacks: { document: '/apps' },
});

const headersConfigs =
  PLATFORM === 'vercel'
    ? {
        async headers() {
          return [
            {
              // matching all API routes
              source: '/api/:path*',
              headers: [
                { key: 'Access-Control-Allow-Credentials', value: 'true' },
                { key: 'Access-Control-Allow-Origin', value: '*' },
                {
                  key: 'Access-Control-Allow-Methods',
                  value: 'GET,DELETE,PATCH,POST,PUT',
                },
                {
                  key: 'Access-Control-Allow-Headers',
                  value:
                    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                },
              ],
            },
          ];
        },
      }
    : {};

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  swcMinify: true,
  trailingSlash: true,
  reactStrictMode: true,
  output:
    NODE_ENV !== 'development' && PLATFORM !== 'vercel'
      ? 'export'
      : 'standalone',
  compiler: { removeConsole: NODE_ENV !== 'development' },
  ...headersConfigs,
};

const pwaConfig = withPWA(nextConfig);

const withMDX = createMDX({
  experimental: {
    mdxRs: true,
  },
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

const mdxConfig = withMDX(pwaConfig);

export default million.next(mdxConfig);
