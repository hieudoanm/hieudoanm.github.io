/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from 'next';
import nextPWA from 'next-pwa';

const withPWA = nextPWA({
  dest: 'public',
});

const NODE_ENV = process.env.NODE_ENV ?? 'development';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: NODE_ENV === 'development' ? '' : '/nothing',
  reactStrictMode: true,
  trailingSlash: true,
  distDir: 'docs',
};

export default withPWA(nextConfig as any);
