/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from 'next';
import nextPWA from 'next-pwa';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const withPWA = nextPWA({
  dest: 'public',
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
  scope: NODE_ENV === 'development' ? '/' : '/nothing',
});

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  experimental: { turbo: { treeShaking: true } },
  basePath: NODE_ENV === 'development' ? '' : '/nothing',
  distDir: NODE_ENV === 'development' ? '.next' : '../../docs',
  webpack: (config) => {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };
    return config;
  },
};

export default withPWA(nextConfig as any);
