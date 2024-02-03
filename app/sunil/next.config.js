/** @type {import('next').NextConfig} */

const { withExpo } = require('@expo/next-adapter');
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

const output = BUILD_ENV === 'desktop' ? 'export' : 'standalone';
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
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
});

module.exports = withExpo(nextConfig);
