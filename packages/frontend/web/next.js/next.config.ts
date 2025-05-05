import type { NextConfig } from 'next';
import nextPWA from 'next-pwa';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const withPWA = nextPWA({
  scope: '/',
  dest: 'public',
  disable: NODE_ENV === 'development',
  register: NODE_ENV !== 'development',
});

const nextConfig: NextConfig = {
  /* config options here */
  output: NODE_ENV === 'development' ? 'standalone' : 'export',
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  turbopack: {},
  basePath: '',
  distDir: NODE_ENV === 'development' ? '.next' : '../../../../docs',
  webpack: (config) => {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };
    return config;
  },
};

export default withPWA(nextConfig);
