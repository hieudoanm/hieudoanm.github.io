import type { NextConfig } from 'next';

const EXPORT: string = process.env.EXPORT ?? '<empty>';
const EXPORT_BOOLEAN: boolean = EXPORT === 'true';

console.log('EXPORT (BOOLEAN)', EXPORT, EXPORT_BOOLEAN);

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: EXPORT_BOOLEAN ? 'export' : undefined,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
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
