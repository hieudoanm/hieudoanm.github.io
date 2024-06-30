import mdx from '@next/mdx';
import million from 'million/compiler';
import nextPWA from 'next-pwa';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const withPWA = nextPWA({
  dest: 'public',
  skipWaiting: true,
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
  fallbacks: { document: '/apps' },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  swcMinify: true,
  output: process.env.NODE_ENV !== 'development' ? 'export' : 'standalone',
  reactStrictMode: true,
  images: { loader: 'akamai', path: '' },
  compiler: {
    removeConsole: process.env.NODE_ENV !== 'development',
  },
};

const pwaConfig = withPWA(nextConfig);

const withMDX = mdx();

const mdxConfig = withMDX(pwaConfig);

export default million.next(mdxConfig);
