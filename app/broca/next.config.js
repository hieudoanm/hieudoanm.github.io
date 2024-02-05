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

const output = BUILD_ENV === 'static' ? 'export' : 'standalone';
const pageExtensions =
  BUILD_ENV === 'static' ? ['page.tsx', 'page.ts'] : undefined;
const transpilePackages =
  BUILD_ENV === 'mobile' ? ['expo', 'react-native'] : undefined;

const nextConfig = withPWA({
  output,
  pageExtensions,
  transpilePackages,
  swcMinify: true,
  reactStrictMode: true,
  experimental: { forceSwcTransforms: true },
});

module.exports = nextConfig;
