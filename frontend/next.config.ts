/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      //Add your production Strapi domain here when you deploy
      {
        protocol: 'https',
        hostname: 'victorious-strength-82f631d95b.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;