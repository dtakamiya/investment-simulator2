import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? 'dist' : '.next',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/investment-simulator2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/investment-simulator2' : '',
  trailingSlash: true,
};

export default nextConfig;
