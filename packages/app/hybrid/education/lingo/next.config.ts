import type { NextConfig } from 'next';

const BASE_PATH: string = process.env.BASE_PATH ?? '';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: 'export',
  basePath: BASE_PATH,
  transpilePackages: ['marked'],
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE_PATH,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {
    rules: {
      '*.md': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
