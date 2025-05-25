/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ["news.doptor.net", "dailyniropekkho.com"],
  },
  env: {
    PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    PUBLIC_URL_PROD: process.env.NEXT_PUBLIC_URL_PROD,
    AWS_BASE_URL: process.env.AWS_BASE_URL,
    AWS_BASE_URL_PROD: process.env.AWS_BASE_URL_PROD,
    AWS_CDN: process.env.AWS_CDN_URL,
  },
};

module.exports = nextConfig;
