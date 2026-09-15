import type { NextConfig } from 'next';

const BASE_PATH: string = process.env.BASE_PATH ?? '';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: 'export',
  basePath: BASE_PATH,
  transpilePackages: [
    '@codemirror/commands',
    '@codemirror/lang-markdown',
    '@codemirror/language',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/theme-one-dark',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/markdown',
    '@lezer/lr',
    'd3-force',
    'd3-dispatch',
    'd3-quadtree',
    'd3-timer',
    'marked',
  ],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
