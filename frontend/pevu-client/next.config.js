/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'minio', 'pevu-media-service.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'minio',
        port: '9000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pevu-media-service.onrender.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig 