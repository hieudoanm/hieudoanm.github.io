import million from 'million/compiler';
import nextPWA from 'next-pwa';

const NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`NODE_ENV=${NODE_ENV}`);

const withPWA = nextPWA({
  dest: 'public',
  skipWaiting: true,
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  swcMinify: true,
  output: 'export',
  reactStrictMode: true,
  images: { loader: 'akamai', path: '' },
});

export default million.next(nextConfig);
