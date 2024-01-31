/** @type {import('next').NextConfig} */

const nextPWA = require('next-pwa');

const NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`NODE_ENV=${NODE_ENV}`);

const withPWA = nextPWA({
  dest: 'public',
  register: NODE_ENV === 'production',
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    });

    return config;
  },
});

module.exports = nextConfig;
