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
  swcMinify: true,
  output: 'export',
  reactStrictMode: true,
  images: { loader: 'akamai', path: '' },
});

module.exports = nextConfig;
