import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable following symlinks
    externalDir: true,
  },
  webpack: (config) => {
    // Follow symlinks
    config.resolve.symlinks = true
    return config
  },
}

export default nextConfig
