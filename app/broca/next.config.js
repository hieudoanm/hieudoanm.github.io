/** @type {import('next').NextConfig} */

const nextPWA = require('next-pwa');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`NODE_ENV=${NODE_ENV}`);

const BUILD_ENV = process.env.BUILD_ENV ?? 'web';
console.log(`BUILD_ENV=${BUILD_ENV}`);

const withPWA = nextPWA({
  dest: 'public',
  register: NODE_ENV === 'production',
  skipWaiting: true,
});

const output = BUILD_ENV === 'static' ? 'export' : 'standalone';
const pageExtensions =
  BUILD_ENV === 'static'
    ? ['page.tsx', 'page.ts']
    : ['page.tsx', 'page.ts', 'route.tsx', 'route.ts'];

const nextConfig = withPWA({
  output,
  pageExtensions,
  reactStrictMode: true,
});

module.exports = nextConfig;
