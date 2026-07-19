import type { NextConfig } from 'next';

const nodeBuiltinStub = './src/lib/stubs/node-builtins.ts';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: 'export',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  turbopack: {
    resolveAlias: {
      fs: nodeBuiltinStub,
      path: nodeBuiltinStub,
      crypto: nodeBuiltinStub,
    },
  },
};

export default nextConfig;
