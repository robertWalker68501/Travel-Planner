import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '8c1uil0b5t.ufs.sh',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
