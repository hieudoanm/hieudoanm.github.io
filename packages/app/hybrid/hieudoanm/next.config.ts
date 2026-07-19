import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: 'export',
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
