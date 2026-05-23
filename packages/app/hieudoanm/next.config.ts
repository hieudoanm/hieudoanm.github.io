import type { NextConfig } from 'next';

const EXPORT: boolean = process.env.EXPORT === 'true';

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactCompiler: true,
  reactStrictMode: true,
  output: EXPORT ? 'export' : undefined,
};

export default nextConfig;
