/** @type {import('next').NextConfig} */

const nextPWA = require('next-pwa');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`NODE_ENV=${NODE_ENV}`);

const BUILD_ENV = process.env.BUILD_ENV ?? 'web';
console.log(`BUILD_ENV=${BUILD_ENV}`);

const withPWA = nextPWA({
  dest: 'public',
  skipWaiting: true,
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
});

const output = BUILD_ENV === 'static' ? 'export' : undefined;
const pageExtensions =
  BUILD_ENV === 'static' ? ['page.tsx', 'page.ts'] : undefined;
const transpilePackages =
  BUILD_ENV === 'mobile' ? ['expo', 'react-native'] : undefined;
const headers = [
  { key: 'Access-Control-Allow-Origin', value: '*' },
  { key: 'Access-Control-Allow-Headers', value: '*' },
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  },
];

const nextConfig = withPWA({
  output,
  pageExtensions,
  transpilePackages,
  swcMinify: true,
  reactStrictMode: true,
  experimental: { forceSwcTransforms: true },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.chesscomfiles.com' },
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
  async headers() {
    return [{ source: '/api/graphql', headers }];
  },
});

module.exports = nextConfig;
