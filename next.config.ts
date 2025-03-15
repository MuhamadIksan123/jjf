import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  images: {
    // domains: ['localhost'], // Untuk domain tertentu seperti localhost
    domains: ['127.0.0.1', 'youtube.com', 'www.youtube.com', '172.10.11.3', 'https://cms.jakartajusticeforum.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.jakartajusticeforum.org',
        pathname: '/storage/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `s
            
                default-src 'self' blob: data:;
     script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com;
              frame-src 'self' blob: https://www.youtube.com https://youtube.com;
                style-src 'self' 'unsafe-inline';
                img-src 'self' http: https: data:;
              `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
