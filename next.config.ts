import type { NextConfig } from 'next';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: NODE_ENV === 'development' ? '' : '/clock',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'docs',
};

export default nextConfig;
